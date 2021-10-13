import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './Register.css'

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const handleUsernameChange = (username) => {
        setUsername(username)
    }

    const handlePasswordChange = (password) => {
        setPassword(password)
    }

    const handleSubmitClick = () => {
        if (username.length < 6){
            alert('Username must at least 6 characters long') 
            return
        }
        if (password.length < 8){
            alert('Password must at least 8 characters long')
            return
        }
        axios.post(
            `${process.env.REACT_APP_SERVER}/auth/register`,
            { username: username, password: password }
        )
            .then(response => {
                if (response.data.error) {
                    alert(response.data.error)
                }
                else {
                    history.push('/login')
                }
            })
    }

    useEffect(() => {
        //nothing
    }, [])

    return (
        <div className='register-container'>
            <div className='box-container'>
                <h1>Register</h1>
                <div className='field-box'>
                    <label>Username:</label>
                    <input value={username} onChange={(e) => handleUsernameChange(e.target.value)} />
                </div>
                <div className='field-box'>
                    <label>Password:</label>
                    <input value={password} type='password' onChange={(e) => handlePasswordChange(e.target.value)} />
                </div>
                <button onClick={() => handleSubmitClick()}>Submit</button>
                <h3 onClick={() => { history.push('/login') }}>Already have an account?</h3>
            </div>
        </div>
    )
}
