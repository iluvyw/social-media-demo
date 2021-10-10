import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'
import './Profile.css'
import axios from 'axios'

export default function Profile() {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState([])
    const [newImg, setNewImg] = useState(null)
    const [allPosts, setAllPosts] = useState([])
    const [numPosts, setNumPosts] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)

    useEffect(() => {
        async function fetchUserInfo() {
            await axios.get(`http://localhost:3001/user/${isAuth.id}`)
                .then(response => {
                    if (response.data.error) {
                        alert(response.data.error)
                    }
                    else {
                        setUserInfo(response.data)
                    }
                })
        }
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
        fetchUserInfo()
        fetchPosts()
        fetchFollowers()
        fetchFollowings()
    }, [isAuth, setUserInfo, setAllPosts, setNumPosts, setFollowers, setFollowings])

    const refreshPage = ()=>{
        window.location.reload();
     }   

    useEffect(() => {
        updateAvatar()
    }, [isAuth.id,newImg])

    const updateAvatar = () => {
        if (newImg) {
            let data = new FormData()
            data.append('userId', isAuth.id)
            data.append('image', newImg)
            axios.put(
                'http://localhost:3001/user',
                data
            )
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    console.log('Update avatar success')
                    refreshPage()
                }
            })
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
        setIsAuth({
            id: 0,
            username: "",
            status: false
        })
    }

    const handleUpdateAvatar = (e) => {
        setNewImg(e.target.files[0])
    }

    return (
        <div className='profile-container'>
            <label for="imgInput">
                <img className='avatar' src={userInfo.length > 0 ? `http://localhost:3001/user/images/${userInfo[0].avatar}` : null} alt='avatar' />
            </label>
            <input id="imgInput" name="image" type="file" accept="image/*" onChange={(e) => { handleUpdateAvatar(e) }} />
            <h1>@{isAuth.username}</h1>
            <div className='stat-section'>
                <div className='left'><h3>{numPosts} posts</h3></div>
                <div className='middle'><h3>{followers} followers</h3></div>
                <div className='right'><h3>{followings} followings</h3></div>   
            </div>
            <h2>Pham Hoang An</h2>
            <h3>I'm a handsome person</h3>
            <div className='post-section'>
                {allPosts.map(item =>  <img src={"http://localhost:3001/post/images/" + item.image} alt='postpicture' key={item.id} />)}
            </div>
            <button onClick={() => handleLogOut()}><h4>Log Out</h4></button>
        </div>
    )
}
