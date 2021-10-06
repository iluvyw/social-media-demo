const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

router.get('/:postId', (req, res) => {
    const {postId} = req.params
    db.query(
        'select * from Likes where postId = ?',
        [postId],
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

router.post('/', (req, res) => {
    const {userId, postId} = req.body
    db.query(
        'insert into Likes(userId, postId) values (?,?)',
        [userId,postId],
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

router.delete('/', (req, res) => {
    const {userId, postId} = req.body
    db.query(
        'delete from Likes where (userId = ? and postId = ?)',
        [userId,postId],
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

module.exports = router