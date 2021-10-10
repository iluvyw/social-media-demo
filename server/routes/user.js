const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const upload = require('../middleware/AvatarMiddleware')
const path = require('path')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

router.use('/images',express.static(path.join(path.resolve(__dirname,'..'),'/Avatars/')))

router.put('/', upload.single('image'), (req, res) => {
    const {userId} = req.body
    const image = req.imageName
    db.query(
        'update Users set avatar = ? where id = ?',
        [image,userId],
        (error, result, field) => {
            if(error) {
                res.send({error: error.code})
            }
            else {
                res.json(result)
            }
        }
    )
})

router.get('/', (req,res) => {
    db.query(
        'select * from Users',
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                res.json(result)
            }
        }
    )
})

router.post('/', (req,res) => {
    const { username, password } = req.body
    db.query(
        'insert into Users(username,password,avatar,name,description) values (?,?,?,?,?)',
        [username, password, '', 'Name', 'Description'],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                res.json(result)
            }
        }
    )
    console.log('Done')
})

router.get('/:id', (req,res) => {
    const { id } = req.params
    db.query(
        'select * from Users where id = ?',
        [id],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                res.json(result)
            }
        }
    )
})

module.exports = router