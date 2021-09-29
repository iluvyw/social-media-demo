import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NewCard() {
    const [word,setWord] = useState('')
    const [meaning,setMeaning] = useState('')

    const handleSubmit = () => {
        axios.post('http://localhost:3001/card',{
            word: word, 
            meaning: meaning
        })
        .then(response => {
            if (response.data === 'ER_DUP_ENTRY') {
                alert('This word is already existed')
            }
        })
        .catch(error => {
            console.log(error)
        })
        setWord('')
        setMeaning('')
    }

    const handleWordChange = (e) => {
        setWord(e.target.value)
    }

    const handleMeaningChange = (e) => {
        setMeaning(e.target.value)
    }

    return (
        <div>
            <label>Word</label>
            <input placeholder='Word...' onChange={(e) => handleWordChange(e)} value={word}/>
            <label>Meaning</label>
            <input placeholder='Meaning...' onChange={(e) => handleMeaningChange(e)} value={meaning}/>
            <button onClick={() => handleSubmit()}>Submit</button>
            <Link to='/'>Back</Link>
        </div>
    )
}
