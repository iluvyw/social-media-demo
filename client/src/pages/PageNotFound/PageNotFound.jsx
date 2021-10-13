import React from 'react'
import { useHistory } from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound({body}) {
    const history = useHistory()
    
    return (
        <div className='page-not-found'>
            <h1>{body}</h1>
            <h3 onClick={() => history.push('/')}>Return home</h3>
        </div>
    )
}
