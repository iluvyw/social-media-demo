import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'

export default function NewPost() {
    const [status,setStatus] = useState("")
    const [image,setImage] = useState()
    const [imageUrl,setImageUrl] = useState()

    const {isAuth} = useContext(AuthContext)

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handleImageSubmit = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handlePostSubmit = async () => {
        let data = new FormData()
        data.append('userId',isAuth.id)
        data.append('username',isAuth.username)
        data.append('image',image)
        data.append('body',status)
        await axios.post(
            'http://localhost:3001/post',
            //{userId: isAuth.id, username: isAuth.username, image: data, body: status}
            data
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                alert('Post success')
            }
        })
    }

    return (
        <div>
            <textarea value={status} onChange={(e) => handleStatusChange(e)} placeholder="What are you thinking?" cols="50" rows="10"></textarea>
            {/* <input value={status} onChange={(e) => handleStatusChange(e)}/> */}
            <input name="image" type="file" accept="image/*"  onChange={(e) => {handleImageSubmit(e)}}/>
            <button onClick={() => handlePostSubmit()}>Post</button>
            <img src={imageUrl} alt="sth"/>
        </div>
    )
}
