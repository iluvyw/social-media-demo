import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import axios from 'axios'
import {useHistory, useParams} from 'react-router-dom'
import FollowDialog from '../../components/FollowDialog/FollowDialog'

export default function UserProfile() {
    const {id} = useParams()
    const [userInfo,setUserInfo] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [numPosts,setNumPosts] = useState(0)
    const [followers,setFollowers] = useState(0)
    const [followings,setFollowings] = useState(0)
    const [showDialog,setShowDialog] = useState({type: "", userList: [], status: false})
    const [allFollowers,setAllFollowers] = useState([])
    const [allFollowings,setAllFollowings] = useState([])

    const history = useHistory()

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
                    setAllFollowers(response.data)
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
                    setAllFollowings(response.data)
                }
            })
        }
        fetchPosts()
        fetchFollowers()
        fetchFollowings()
    }, [id,setAllPosts,setNumPosts,setFollowers,setFollowings,setAllFollowers,setAllFollowings])

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
    },[id,setUserInfo])

    useEffect(() => {
        console.log('dialog show')
    },[showDialog])

    return (
        <div className='userprofile-container'>
            <img className='avatar' src={userInfo.length > 0 ? `http://localhost:3001/user/images/${userInfo[0].avatar}` :'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png'} alt='avatar' />
            <h1>@{userInfo.length > 0 ? userInfo[0].username : ""}</h1>
            <div className='stat-section'>
                <h3>{numPosts} posts</h3>
                <h3 className='followers' onClick={() => setShowDialog({type: "Followers", userList: allFollowers, status: true})}>{followers} followers</h3>
                <h3 className='followings' onClick={() => setShowDialog({type: "Followings", userList: allFollowings, status: true})}>{followings} following</h3>
            </div>
            <h2>{userInfo.length > 0 ? userInfo[0].name : ""}</h2>
            <h3>{userInfo.length > 0 ? userInfo[0].description : ""}</h3>
            <div className='post-section'>
                {allPosts.map(item =>  <img onClick={() => history.push(`/post/${item.id}`)} src={"http://localhost:3001/post/images/" + item.image} alt='postimage' key={item.id} />)}
            </div>
            <button className='back-button' onClick={() => history.goBack()}>Back</button>
            {showDialog.status === true ? <FollowDialog setShowDialog={setShowDialog} type={showDialog.type} userList={showDialog.userList}/> : <></>}
        </div>
    )
}
