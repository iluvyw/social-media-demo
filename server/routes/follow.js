const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

router.get('/', (req, res) => {
    db.query(
        'select * from Follows',
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

router.get('/:userId', (req, res) => {
    const { userId } = req.params
    db.query(
        'select * from Follows where userId = ?',
        [userId],
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
    const {userId, followerId} = req.body
    db.query(
        'insert into Follows(followerId, userId) values (?,?)',
        [followerId,userId],
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
    const {userId, followerId} = req.body
    db.query(
        'delete from Follows where (userId = ? and followerId = ?)',
        [userId,followerId],
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