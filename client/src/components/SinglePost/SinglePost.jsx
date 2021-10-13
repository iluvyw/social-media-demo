import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SinglePost.css'

export default function SinglePost({id, userId, username, body, image}) {
    const [userInfo,setUserInfo] = useState([])

    const history = useHistory()

    useEffect(() => {
        async function fetchUserInfo() {
            await axios.get(`${process.env.REACT_APP_SERVER}/user/${userId}`)
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
    },[userId,setUserInfo])

    return (
        <div className='post-container'>
            <div className='post-header'>
                <img onClick={() => {history.push(`/user/${userId}`)}} className='avatar' src={userInfo.length > 0 ? `${process.env.REACT_APP_SERVER}/user/images/` + userInfo[0].avatar : null} alt="avatar"/>
                <h3 onClick={() => {history.push(`/user/${userId}`)}}>{username}</h3>
            </div>
            <div className='post-image'>
                <img onClick={() => history.push(`/post/${id}`)} src={`${process.env.REACT_APP_SERVER}/post/images/`+image} alt="postpic"/>
            </div>
            <div className='action-bar'>

            </div>
            <div className='post-status'>
                <h3>{body}</h3>
            </div>
        </div>
    )
}

