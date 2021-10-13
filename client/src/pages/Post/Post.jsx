import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../helper/AuthContext'
import Comment from '../../components/Comment/Comment'
import './Post.css'
import PageNotFound from '../PageNotFound/PageNotFound'

export default function Post() {
    const {isAuth,setIsAuth} = useContext(AuthContext)
    const {id} = useParams()
    const [comment,setComment] = useState("")
    const [allComments,setAllComments] = useState([])
    const [postInfo,setPostInfo] = useState(null)
    const [userInfo,setUserInfo] = useState(null)
    const [refresh,setRefresh] = useState(true)
    const history = useHistory()

    useEffect(() => {
        async function fetchPostData(){
            await axios.get(`${process.env.REACT_APP_SERVER}/post/id/${id}`)
            .then(response => {
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    //console.log(response.data[0])
                    setPostInfo(response.data[0])
                }
            })
        }
        async function fetchComments(){
            await axios.get(`${process.env.REACT_APP_SERVER}/comment/${id}`)
            .then(response => {
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    //console.log(response.data)
                    setAllComments(response.data)
                }
            })
        }
        fetchPostData()
        fetchComments()
    },[id,setPostInfo,setAllComments])

    useEffect(() => {
        async function fetchUserInfo(){
            if (postInfo !== null && postInfo !== undefined){
                await axios.get(`${process.env.REACT_APP_SERVER}/user/${postInfo.userId}`)
                .then(response => {
                    if (response.data.error){
                        alert(response.data.error)
                    }
                    else{
                        //console.log(response.data[0])
                        setUserInfo(response.data[0])
                    }
                })
            }
        }
        fetchUserInfo()
    },[postInfo,setUserInfo])

    useEffect(() => {
        //console.log('rerender')
        async function fetchComments(){
            await axios.get(`${process.env.REACT_APP_SERVER}/comment/${id}`)
            .then(response => {
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    //console.log(response.data)
                    setAllComments(response.data)
                }
            })
        }
        fetchComments()
    },[id,refresh])

    const handleChangeComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmitComment = () => {
        if (comment !== ""){
            axios.post(
                `${process.env.REACT_APP_SERVER}/comment`,
                {userId: isAuth.id, postId: id, body: comment},
                {
                    headers: {
                      accessToken: localStorage.getItem("accessToken")
                    }
                }
            )
            .then(response => {
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    //console.log('Comment success')
                    setComment("")
                    setRefresh(!refresh)
                }
            })
        }
    }   

    const handleDeletePost = () => {
        console.log(id)
        axios.delete(
            `${process.env.REACT_APP_SERVER}/post`,
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                },
                data: {id: id}
            }
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                history.goBack()
            }
        })
    }

    return (
        postInfo !== undefined ?
        <div className='post-main-section'>
            <div className="content-section">
                {
                    (postInfo !== null && userInfo !== null) ? <>
                        <div className='header'>
                            <div className='left'>
                                <img onClick={() => history.push(`/user/${userInfo.id}`)} src={`${process.env.REACT_APP_SERVER}/user/images/`+userInfo.avatar} alt='avatar'/>
                                <h3 onClick={() => history.push(`/user/${userInfo.id}`)} className='username'>{userInfo.name}</h3>
                            </div>
                            {isAuth.id === userInfo.id ? <h3 className='delete-post' onClick={() => handleDeletePost()}>Delete</h3> : <></>}
                            <h3 onClick={() => history.goBack()} className='back'>Back</h3>
                        </div>
                        <img id="postImage" src={`${process.env.REACT_APP_SERVER}/post/images/`+postInfo.image} alt='postImage'/>
                        <div className='body'>
                            <h2>{postInfo.body}</h2>
                        </div>
                    </> : <></>
                }
            </div>
            <div className="comment-section">
                <div className="all-comment">
                    {allComments.length > 0 ? allComments.map(item => <Comment key={item.id} commentId={item.id} userId={item.userId} commentBody={item.body} refresh={refresh} setRefresh={setRefresh}/>) : <h1>No comments</h1>}
                </div>
                <div className="input-comment">
                    <input value={comment} onChange={(e) => handleChangeComment(e)} placeholder='Enter your comment...'/>
                    <button onClick={() => handleSubmitComment()}>Send</button>
                </div>
            </div>
        </div> : <PageNotFound body={"Post not found"}/>
    )
}
