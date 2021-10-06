import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../helper/AuthContext'
import { useHistory } from 'react-router-dom'
import './Login.css'

export default function Login() {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const {setIsAuth} = useContext(AuthContext)
    const history = useHistory()

    useEffect(()=>{
        //nothing
    },[])
    
    const handleUsernameChange = (username) => {
        setUsername(username)
    }

    const handlePasswordChange = (password) => {
        setPassword(password)
    }

    const handleSubmitClick = () => {
        axios.post(
            "http://localhost:3001/auth/login",
            {username: username, password: password}
        )
        .then(response => {
            if (response.data.error){
                alert(response.data.error)
            }
            else{
                localStorage.setItem("accessToken",response.data.accessToken)
                setIsAuth({
                    id: response.data.id,
                    username: response.data.username,
                    status: true
                })
                history.push('/')
            }
        })
    }

    useEffect(() => {
        //nothing
    },[])

    return (
        <div className='login-container'>
        <div className='box-container'>
            <h1>Login</h1>
            <div className='field-box'>
                <label>Username:</label>
                <input value={username} onChange={(e) => handleUsernameChange(e.target.value)} />
            </div>
            <div className='field-box'>
                <label>Password:</label>
                <input value={password} type='password' onChange={(e) => handlePasswordChange(e.target.value)} />
            </div>
            <button onClick={() => handleSubmitClick()}>Submit</button>
            <button onClick={() => { history.push('/register') }}>To Register</button>
        </div>
    </div>
    )
}
