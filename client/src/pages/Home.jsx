import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from '../components/Card/Card'
import './Page.css'

export default function Home() {
    const [cardList,setCardList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/card').then((response => {
            setCardList(response.data)
        }))
        .catch(error => console.log(error))
        return () => {
            setCardList([])
        }
    },[])
    
    return (
        <div className='home'>
            {cardList.map(card => <Card word={card.word} meaning={card.meaning}/>)}
            <Link className='link' to='/newcard'>New Card</Link>
        </div>
    )
}
