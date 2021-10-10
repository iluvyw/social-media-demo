import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function UserProfile() {
    const {id} = useParams()
    const [userInfo,setUserInfo] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [numPosts,setNumPosts] = useState(0)
    const [followers,setFollowers] = useState(0)
    const [followings,setFollowings] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            await axios.get(`http://localhost:3001/post/${id}`)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    setNumPosts(response.data.length)
                    setAllPosts(response.data)
                }
            })
        }
        async function fetchFollowers() {
            await axios.get(`http://localhost:3001/follow/follower/${id}`)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    setFollowers(response.data.length)
                }
            })
        }
        async function fetchFollowings() {
            await axios.get(`http://localhost:3001/follow/following/${id}`)
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    setFollowings(response.data.length)
                }
            })
        }
        fetchPosts()
        fetchFollowers()
        fetchFollowings()
    }, [id,setAllPosts,setNumPosts,setFollowers,setFollowings])

    useEffect(() => {
        async function fetchUserInfo() {
            await axios.get(`http://localhost:3001/user/${id}`)
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
    },[setUserInfo])

    return (
        <div className='userprofile-container'>
            <img className='avatar' src={userInfo.length > 0 ? `http://localhost:3001/user/images/${userInfo[0].avatar}` :'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'} alt='avatar' />
            <h1>@{userInfo.length > 0 ? userInfo[0].username : "None"}</h1>
            <div className='stat-section'>
                <h3>{numPosts} posts</h3>
                <h3>{followers} followers</h3>
                <h3>{followings} following</h3>
            </div>
            <h2>Pham Hoang An</h2>
            <h3>I'm a handsome person</h3>
            <div className='post-section'>
                {allPosts.map(item =>  <img src={"http://localhost:3001/post/images/" + item.image} alt='postimage' key={item.id} />)}
            </div>
        </div>
    )
}
