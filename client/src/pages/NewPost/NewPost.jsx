import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'

export default function NewPost() {
    const [status,setStatus] = useState("")
    const [imgLink,setImgLink] = useState("https://images.hdqwalls.com/wallpapers/morzine-france-landscape-4k-bj.jpg")
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
            <input value={status} onChange={(e) => handleStatusChange(e)}/>
            <input name="image" type="file" onChange={(e) => {handleImageSubmit(e)}}/>
            <button onClick={() => handlePostSubmit()}>Post</button>
            {/* <form method='POST' action='http://localhost:3001/post' encType="multipart/form-data">
                <input name='image' type='file'/>
                <input type='submit'/>
            </form> */}
            <img src={imageUrl}/>
        </div>
    )
}
