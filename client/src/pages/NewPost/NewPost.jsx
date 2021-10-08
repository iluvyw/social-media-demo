import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'

export default function NewPost() {
    const [status,setStatus] = useState("")
    const [imgLink,setImgLink] = useState("https://images.hdqwalls.com/wallpapers/morzine-france-landscape-4k-bj.jpg")

    const {isAuth} = useContext(AuthContext)

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handlePostSubmit = async () => {
        await axios.post(
            'http://localhost:3001/post',
            {userId: isAuth.id, username: isAuth.username, image: imgLink, body: status}
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
            <button onClick={() => handlePostSubmit()}>Post</button>
        </div>
    )
}
