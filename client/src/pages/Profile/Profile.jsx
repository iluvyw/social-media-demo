import React, { useContext } from 'react'
import { AuthContext } from '../../helper/AuthContext'

export default function Profile() {
    const {isAuth,setIsAuth} = useContext(AuthContext)

    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
        setIsAuth({
            id: 0,
            username: "",
            status: false
        })
    }
    
    return (
        <div>
            <h1>{isAuth.username}</h1>
            <button onClick={() => handleLogOut()}>Log Out</button>
        </div>
    )
}
