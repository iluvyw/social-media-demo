import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'
import './Profile.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import FollowDialog from '../../components/FollowDialog/FollowDialog'


export default function Profile() {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState([])
    const [newImg, setNewImg] = useState(null)
    const [allPosts, setAllPosts] = useState([])
    const [numPosts, setNumPosts] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [followings, setFollowings] = useState(0)
    const [editName, setEditName] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const [newName, setNewName] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [showDialog,setShowDialog] = useState({type: "", userList: [], status: false})
    const [allFollowers,setAllFollowers] = useState([])
    const [allFollowings,setAllFollowings] = useState([])

    const history = useHistory()

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
                        setAllFollowers(response.data)
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
                        setAllFollowings(response.data)
                    }
                })
        }
        fetchUserInfo()
        fetchPosts()
        fetchFollowers()
        fetchFollowings()
    }, [isAuth, setUserInfo, setAllPosts, setNumPosts, setFollowers, setFollowings, setAllFollowings, setAllFollowers])

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        updateAvatar()
    }, [isAuth.id, newImg])

    useEffect(() => {
        console.log('dialog show')
    },[showDialog])

    useEffect(() => {
        console.log('rerender')
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
        fetchUserInfo()
    }, [isAuth.id, editName, editDescription])

    const updateAvatar = () => {
        if (newImg) {
            let data = new FormData()
            data.append('userId', isAuth.id)
            data.append('image', newImg)
            axios.put(
                'http://localhost:3001/user',
                data,
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }
            )
                .then(response => {
                    if (response.data.error) {
                        console.log('Error upload image')
                        refreshPage()
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

    const handleUpdateName = (e) => {
        setNewName(e.target.value)
    }

    const updateName = (newName) => {
        axios.put(
            `http://localhost:3001/user/update/?userId=${isAuth.id}&name=${newName}`,
            {},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        )
            .then(response => {
                if (response.data.error) {
                    console.log('Error update name')
                    refreshPage()
                }
                else {
                    console.log('Update name success')
                }
            })
    }

    const handleEditNameClick = () => {
        if (editName === true) {
            updateName(newName)
        }
        setEditName(!editName)
    }

    const handleUpdateDescription = (e) => {
        setNewDescription(e.target.value)
    }

    const updateDescription = (newDescription) => {
        axios.put(
            `http://localhost:3001/user/update/?userId=${isAuth.id}&description=${newDescription}`,
            {},
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }
        )
            .then(response => {
                if (response.data.error) {
                    console.log('Error upload description')
                    refreshPage()
                }
                else {
                    console.log('Update description success')
                }
            })
    }

    const handleEditDescriptionClick = () => {
        if (editDescription === true) {
            updateDescription(newDescription)
        }
        setEditDescription(!editDescription)
    }

    const handleDeleteUser = () => {
        axios.delete(
            `http://localhost:3001/user/${isAuth.id}`,
            {headers: {
                accessToken: localStorage.getItem("accessToken")
            }}
            )
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    console.log('Delete successful')
                    localStorage.removeItem("accessToken")
                    setIsAuth({
                        id: 0,
                        username: "",
                        status: false
                    })
                }
            })
    }

    return (
        <div className='profile-container'>
            <label htmlFor="imgInput">
                <img className='avatar' src={userInfo.length > 0 ? `http://localhost:3001/user/images/${userInfo[0].avatar}` : null} alt='avatar' />
            </label>
            <input id="imgInput" name="image" type="file" accept="image/*" onChange={(e) => { handleUpdateAvatar(e) }} />
            <h1>@{isAuth.username}</h1>
            <div className='stat-section'>
                <div className='left'><h3>{numPosts} posts</h3></div>
                <div className='middle'><h3 onClick={() => setShowDialog({type: "Followers", userList: allFollowers, status: true})}>{followers} followers</h3></div>
                <div className='right'><h3 onClick={() => setShowDialog({type: "Followings", userList: allFollowings, status: true})}>{followings} followings</h3></div>
            </div>
            <div className='name-section'>
                {
                    editName === false ? <h2>{userInfo.length > 0 ? userInfo[0].name : ""}</h2> : <input className="name-input" value={newName} placeholder='New name input' type='text' onChange={(e) => handleUpdateName(e)} />
                }
                <button className='edit-button' onClick={() => handleEditNameClick()}>{editName === false ? "Edit" : "Done"}</button>
            </div>
            <div className="description-section">
                {
                    editDescription === false ? <h3>{userInfo.length > 0 ? userInfo[0].description : ""}</h3> : <input className="name-input" value={newDescription} placeholder='New description input' type='text' onChange={(e) => handleUpdateDescription(e)} />
                }
                <button className='edit-button' onClick={() => handleEditDescriptionClick()}>{editDescription === false ? "Edit" : "Done"}</button>
            </div>
            <div className='post-section'>
                {allPosts.map(item => <img onClick={() => history.push(`/post/${item.id}`)} src={"http://localhost:3001/post/images/" + item.image} alt='postpicture' key={item.id} />)}
            </div>
            <button className='log-out-button' onClick={() => handleLogOut()}><h4>Log Out</h4></button>
            <button className='log-out-button' onClick={() => handleDeleteUser()}><h4>Delete</h4></button>
            <button className='back-button' onClick={() => history.goBack()}>Back</button>
            {showDialog.status === true ? <FollowDialog setShowDialog={setShowDialog} type={showDialog.type} userList={showDialog.userList}/> : <></>}
        </div>
    )
}
