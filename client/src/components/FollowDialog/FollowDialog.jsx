import React, { useEffect } from 'react'
import './FollowDialog.css'
import User from '../User/User'

export default function FollowDialog({setShowDialog,type,userList}) {
    useEffect(() => console.log(userList),[])
    
    return (
        <div className='dialog-box'>
            <div className="display-follow">
                <div className="header">
                    <h1>{type}</h1>
                    <h1 className='turn-off-dialog' onClick={() => setShowDialog({type: "", userList: [], status: false})}>X</h1>
                </div>
                <div className="body">
                    {userList.map(item => <User username={item.username} userId={type === "Followers" ? item.followerId : item.userId}/>)}
                </div>
            </div>
        </div>
    )
}
