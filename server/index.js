const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3001

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const user = require('./routes/user')
const auth = require('./routes/auth')
const comment = require('./routes/comment')
const follow = require('./routes/follow')
const post = require('./routes/post')

app.use('/user',user)
app.use('/auth',auth)
app.use('/comment',comment)
app.use('/follow',follow)
app.use('/post',post)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})