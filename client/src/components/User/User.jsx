import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../helper/AuthContext'
import './User.css'

export default function User({username, userId}) {
    const {isAuth} = useContext(AuthContext)
    const [action,setAction] = useState("Follow")
    const [userInfo,setUserInfo] = useState([])
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:3001/follow/?followerId=${isAuth.id}&userId=${userId}`)
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                setAction(response.data)
            }
        })
    })

    useEffect(() => {
        async function fetchUserInfo() {
            await axios.get(`http://localhost:3001/user/${userId}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        setUserInfo(response.data)
                    }
                })
        }
        fetchUserInfo()
    },[userId,setUserInfo])
    
    const handleFollowClick = () => {
        axios.post(
            'http://localhost:3001/follow',
            {followerId: isAuth.id, userId: userId}
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                console.log('Follow success')
                setAction("Unfollow")
            }
        })
    }

    const handleUnfollowClick = () => {
        axios.delete(
            'http://localhost:3001/follow',
            {data: {followerId: isAuth.id, userId: userId}}
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                setAction("Follow")
            }
        })
    }

    const handleUserClick = () => {
        history.push(`/user/${userId}`)
    }
    
    return (
        <div className="user-container">
            <div className='user-left' onClick={() => handleUserClick()}>
                <img className='user-avatar' src={userInfo.length > 0 ? "http://localhost:3001/user/images/" + userInfo[0].avatar : null} alt="avatar"/>
                <h3>{username}</h3>
            </div>
            <div className='user-right'>
                {userId !== isAuth.id ? <button onClick={() => {action === "Follow" ? handleFollowClick() : handleUnfollowClick()}}><h3>{action}</h3></button> : <></>}
            </div>
        </div>
    )
}
