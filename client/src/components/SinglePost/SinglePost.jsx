import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './SinglePost.css'

export default function SinglePost({id, userId, username, body, image}) {
    const [userInfo,setUserInfo] = useState([])

    useEffect(() => {
        async function fetchUserInfo() {
            await axios.get(`http://localhost:3001/user/${userId}`)
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
    },[setUserInfo])

    return (
        <div className='post-container'>
            <div className='post-header'>
                <img className='avatar' src={userInfo.length > 0 ? "http://localhost:3001/user/images/" + userInfo[0].avatar : null} alt="avatar"/>
                <h3>{username}</h3>
            </div>
            <div className='post-image'>
                <img src={"http://localhost:3001/post/images/"+image} alt="postpic"/>
            </div>
            <div className='action-bar'>

            </div>
            <div className='post-status'>
                <h3>{body}</h3>
            </div>
        </div>
    )
}

