import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
    const [cardList,setCardList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/card').then((response => {
            setCardList(response.data)
        }))
        .catch(error => console.log(error))
        return () => {}
    })
    
    return (
        <div>
            {cardList.map(card => <div key={card.word}>
                <h1>{card.word}</h1>
                <h2>{card.meaning}</h2>
            </div>)}
            <Link to='/newcard'>New Card</Link>
        </div>
    )
}
