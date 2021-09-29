const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const card = require('./routes/card')

app.use('/card',card)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})