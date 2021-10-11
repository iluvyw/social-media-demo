import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Comment.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../helper/AuthContext'

export default function Comment({commentId,userId,commentBody,setRefresh}) {
    const {isAuth} = useContext(AuthContext)
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
    },[isAuth,userId,commentId,commentBody,setAvatar,setUsername])

    const handleUserClick = () => {
        history.push(`/user/${userId}`)
    }

    const handleDeleteComment = () => {
        axios.delete(
            'http://localhost:3001/comment',
            {data: {id: commentId}}
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                //console.log("Delete Comment")
                setRefresh(true)
            }
        })
    }
    
    return (
        <div className='single-comment-container'>
            <img onClick={() => handleUserClick()} src={avatar !== null ? "http://localhost:3001/user/images/"+avatar : ""} alt='avatar'/>
            <div className='comment-info'>
                <h2 onClick={() => handleUserClick()}>{username}</h2>
                <h3>{commentBody}</h3>
            </div>
            {isAuth.id === userId ? <button onClick={() => handleDeleteComment()}>Delete</button> : <></>}
        </div>
    )
}
