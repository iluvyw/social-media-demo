import axios from 'axios'
import React, { useContext } from 'react'
import { AuthContext } from '../../helper/AuthContext'
import './User.css'

export default function User({username, userId}) {
    const contextApi = useContext(AuthContext)
    
    const handleFollowClick = () => {
        axios.post(
            'http://localhost:3001/follow',
            {followerId: contextApi.isAuth.id, userId: userId}
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                console.log('Follow success')
            }
        })
    }
    
    return (
        <div className="user-container">
            <h1>{username}</h1>
            <button onClick={() => handleFollowClick()}>Follow</button>
        </div>
    )
}
