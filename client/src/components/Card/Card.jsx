import React from 'react'
import { useHistory } from 'react-router-dom'
import './Card.css'

export default function Card({ word, meaning }) {
    const history = useHistory()
    
    const handleClick = (word) => {
        history.push(`/card/${word}`)
    }
    
    return (
        <div className='card-container' onClick={() => handleClick(word)}>
            <h1>{word}</h1>
            <h2>{meaning}</h2>
        </div>
    )
}
