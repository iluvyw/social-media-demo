import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import SinglePost from '../../components/SinglePost/SinglePost'
import User from '../../components/User/User'
import axios from 'axios'
import { AuthContext } from '../../helper/AuthContext'

export default function Feed() {
    const [userList, setUserList] = useState([])
    const [postList, setPostList] = useState([])
    const contextApi = useContext(AuthContext)

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:3001/post/feed/${contextApi.isAuth.id}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        setPostList(response.data)
                    }
                })
        }
        fetchData()
    }, [setPostList,contextApi])

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
                    <a href='/'>Facebook</a>
                </div>
                <div className='nav-mid'>
                    <a href='/newpost'>Create Post</a>
                </div>
                <div className='nav-right'>
                    <a href='/profile'><img src='https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png' alt='avatar' /></a>
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
                        userList.filter(item => item.id !== contextApi.isAuth.id).map((item) =>
                            <User key={item.id} username={item.username} userId={item.id} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
