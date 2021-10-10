import React from 'react'
import './SinglePost.css'

export default function SinglePost({id, userId, username, body, image}) {
    return (
        <div className='post-container'>
            <div className='post-header'>
                <img className='avatar' src={'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'} alt="avatar"/>
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

