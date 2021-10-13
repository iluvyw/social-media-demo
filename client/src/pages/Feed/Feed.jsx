import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import SinglePost from '../../components/SinglePost/SinglePost'
import User from '../../components/User/User'
import axios from 'axios'
import { AuthContext } from '../../helper/AuthContext'
import { useHistory } from 'react-router-dom'

export default function Feed() {
    const [userList, setUserList] = useState([])
    const [postList, setPostList] = useState([])
    const {isAuth} = useContext(AuthContext)
    const [userInfo,setUserInfo] = useState([])
    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            await axios.get(`${process.env.REACT_APP_SERVER}/post/feed/${isAuth.id}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        setPostList(response.data)
                    }
                })
        }
        async function fetchUserInfo() {
            await axios.get(`${process.env.REACT_APP_SERVER}/user/${isAuth.id}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        //console.log(response.data)
                        setUserInfo(response.data)
                    }
                })
        }
        fetchUserInfo()
        fetchData()
    }, [setPostList,isAuth,setUserInfo])

    useEffect(() => {
        async function fetchData(){
            await axios.get(`${process.env.REACT_APP_SERVER}/user`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        setUserList(response.data)
                    }
                })
        }
        fetchData()
    },[setUserList])

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className='feed-container'>
            <nav className='nav-container'>
                <div className='nav-left'>
                    <h1 onClick={() => refreshPage() /*history.push('/')*/}>Bonjour</h1>
                </div>
                <div className='nav-mid'>
                    <h3 onClick={() => history.push('/newpost')}>Create Post</h3>
                </div>
                <div className='nav-right'>
                    <img onClick={() => history.push('/profile')} src={userInfo.length > 0 ? `${process.env.REACT_APP_SERVER}/user/images/` + userInfo[0].avatar : null} alt='avatar' />
                </div>
            </nav>
            <div className='big-container'>
                <div className='posts-container'>
                    {
                        postList.length > 0 ? postList.map(item => <SinglePost key={item.id} id={item.id} username={item.username} userId={item.userId} image={item.image} body={item.body} />) : <h1>Your feed is currently empty. Try following someone.</h1>
                    }
                </div>
                <div className='right-big-container'>
                    <div className='users-container'>
                        {
                            userList.filter(item => item.id !== isAuth.id).map((item) =>
                                <User key={item.id} username={item.username} userId={item.id} />
                            )
                        }
                    </div>
                    <div className='credit'>
                        <h2>Developed By <a href="https://github.com/iluvyw" className='developer-name'>An Pham</a></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
