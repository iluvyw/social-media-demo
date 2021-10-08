import React from 'react'
import './SinglePost.css'

export default function SinglePost({id, userId, username, body, image}) {
    return (
        <div className='post-container'>
            <h1>{userId} {username}</h1>
            <h2>{body}</h2>
            <img src={image} alt="This is a picture"/>
            <h4>{id}</h4>
        </div>
    )
}

