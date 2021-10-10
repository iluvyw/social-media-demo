import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../helper/AuthContext'
import './NewPost.css'
import {useHistory} from 'react-router-dom'

export default function NewPost() {
    const [status, setStatus] = useState("")
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState("http://simpleicon.com/wp-content/uploads/picture.svg")
    const history = useHistory()

    const { isAuth } = useContext(AuthContext)

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handleImageSubmit = (e) => {
        setImage(e.target.files[0])
        setImageUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handlePostSubmit = async () => {
        if (image === null){
            alert('You should add a picture')
            return
        }
        let data = new FormData()
        data.append('userId', isAuth.id)
        data.append('username', isAuth.username)
        data.append('image', image)
        data.append('body', status)
        await axios.post(
            'http://localhost:3001/post',
            data
        )
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    history.push('/')
                }
            })
    }

    return (
        <div className='newpost-container'>
            <div className='form-container'>
                <div className='image-input'>
                    <label for="imgInput">
                        <img src={imageUrl} alt="sth" />
                    </label>
                    <input id="imgInput" name="image" type="file" accept="image/*" onChange={(e) => { handleImageSubmit(e) }} />
                </div>
                <textarea value={status} onChange={(e) => handleStatusChange(e)} placeholder="What are you thinking?" cols="50" rows="10"></textarea>
                <button onClick={() => handlePostSubmit()}><h3>Post</h3></button>
            </div>
        </div>
    )
}
