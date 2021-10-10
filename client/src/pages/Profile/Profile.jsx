import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'
import './Profile.css'
import axios from 'axios'

export default function Profile() {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [allPosts, setAllPosts] = useState([])
    const [numPosts,setNumPosts] = useState(0)
    const [followers,setFollowers] = useState(0)
    const [followings,setFollowings] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            await axios.get(`http://localhost:3001/post/${isAuth.id}`)
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
            await axios.get(`http://localhost:3001/follow/follower/${isAuth.id}`)
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
            await axios.get(`http://localhost:3001/follow/following/${isAuth.id}`)
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
    }, [isAuth,setAllPosts,setNumPosts,setFollowers,setFollowings])

    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
        setIsAuth({
            id: 0,
            username: "",
            status: false
        })
    }

    return (
        <div className='profile-container'>
            <img className='avatar' src={'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'} alt='avatar' />
            <h1>@{isAuth.username}</h1>
            <div className='stat-section'>
                <h3>{numPosts} posts</h3>
                <h3>{followers} followers</h3>
                <h3>{followings} following</h3>
            </div>
            <h2>Pham Hoang An</h2>
            <h3>I'm a handsome person</h3>
            <div className='post-section'>
                {allPosts.map(item => <img src={"http://localhost:3001/post/images/" + item.image} alt='postpicture' key={item.id} />)}
            </div>
            <button onClick={() => handleLogOut()}><h4>Log Out</h4></button>
        </div>
    )
}
