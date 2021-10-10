import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import SinglePost from '../../components/SinglePost/SinglePost'
import User from '../../components/User/User'
import axios from 'axios'
import { AuthContext } from '../../helper/AuthContext'

export default function Feed() {
    const [userList, setUserList] = useState([])
    const [postList, setPostList] = useState([])
    const {isAuth} = useContext(AuthContext)
    const [userInfo,setUserInfo] = useState([])

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:3001/post/feed/${isAuth.id}`)
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
            await axios.get(`http://localhost:3001/user/${isAuth.id}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        console.log(response.data)
                        setUserInfo(response.data)
                    }
                })
        }
        fetchUserInfo()
        fetchData()
    }, [setPostList,isAuth,setUserInfo])

    useEffect(() => {
        async function fetchData(){
            await axios.get('http://localhost:3001/user')
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

    return (
        <div className='feed-container'>
            <nav className='nav-container'>
                <div className='nav-left'>
                    <a href='/'>Bonjour</a>
                </div>
                <div className='nav-mid'>
                    <a href='/newpost'>Create Post</a>
                </div>
                <div className='nav-right'>
                    <a href='/profile'><img src={userInfo.length > 0 ? "http://localhost:3001/user/images/" + userInfo[0].avatar : null} alt='avatar' /></a>
                </div>
            </nav>
            <div className='big-container'>
                <div className='posts-container'>
                    {
                        postList && postList.map(item => <SinglePost key={item.id} id={item.id} username={item.username} userId={item.userId} image={item.image} body={item.body} />)
                    }
                </div>
                <div className='users-container'>
                    {
                        userList.filter(item => item.id !== isAuth.id).map((item) =>
                            <User key={item.id} username={item.username} userId={item.id} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
