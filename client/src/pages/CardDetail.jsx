import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function CardDetail() {
    let { word } = useParams()

    const [wordDetail,setWordDetail] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/card/${word}`).then(
            response => setWordDetail(response.data[0])
        )
        .catch(
            error => console.log(error)
        )
        return () => {}
    })

    return (
        <div>
            <h1>{wordDetail.word}</h1>
            <h2>{wordDetail.meaning}</h2>
        </div>
    )
}
