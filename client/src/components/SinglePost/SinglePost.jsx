import React from 'react'
import './SinglePost.css'

export default function SinglePost({id, userId, body, image}) {
    return (
        <div className='post-container'>
            <h1>{userId}</h1>
            <h2>{body}</h2>
            <h3>{image}</h3>
            <h4>{id}</h4>
        </div>
    )
}

