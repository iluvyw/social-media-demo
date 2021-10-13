import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Comment.css'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../helper/AuthContext'

export default function Comment({commentId,userId,commentBody,setRefresh,refresh}) {
    const {isAuth} = useContext(AuthContext)
    const [avatar,setAvatar] = useState(null)
    const [username,setUsername] = useState("")
    const history = useHistory()

    useEffect(() => {
        async function fetchUserInfo(){
            await axios.get(`${process.env.REACT_APP_SERVER}/user/${userId}`)
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
            `${process.env.REACT_APP_SERVER}/comment`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
                data: {id: commentId}
            }
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                //console.log("Delete Comment")
                setRefresh(!refresh)
            }
        })
    }
    
    return (
        <div className='single-comment-container'>
            <div className='left'>
                <img onClick={() => handleUserClick()} src={avatar !== null ? `${process.env.REACT_APP_SERVER}/user/images/`+avatar : ""} alt='avatar'/>
                <div className='comment-info'>
                    <h2 onClick={() => handleUserClick()}>{username}</h2>
                    <h3>{commentBody}</h3>
                </div>
            </div>
            {isAuth.id === userId ? <h2 className='delete' onClick={() => handleDeleteComment()}>Delete</h2> : <></>}
        </div>
    )
}
