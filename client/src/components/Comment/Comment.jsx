import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Comment.css'
import { useHistory } from 'react-router-dom'

export default function Comment({commentId,userId,commentBody}) {
    const [avatar,setAvatar] = useState(null)
    const [username,setUsername] = useState("")
    const history = useHistory()

    useEffect(() => {
        async function fetchUserInfo(){
            await axios.get(`http://localhost:3001/user/${userId}`)
            .then(response => {
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    //console.log(response.data[0])
                    setAvatar(response.data[0].avatar)
                    setUsername(response.data[0].username)
                }
            })
        }
        fetchUserInfo()
    },[userId,commentId,commentBody,setAvatar,setUsername])

    const handleUserClick = () => {
        history.push(`/user/${userId}`)
    }
    
    return (
        <div className='single-comment-container'>
            <img onClick={() => handleUserClick()} src={avatar !== null ? "http://localhost:3001/user/images/"+avatar : ""} alt='avatar'/>
                <div className='comment-info'>
                    <h2 onClick={() => handleUserClick()}>{username}</h2>
                    <h3>{commentBody}</h3>
             </div>
        </div>
    )
}
