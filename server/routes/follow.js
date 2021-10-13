const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const { validateToken } = require('../middleware/AuthMiddleware')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

// router.get('/', (req, res) => {
//     db.query(
//         'select * from Follows',
//         (error, result, field) => {
//             if(error) {
//                 res.send({error: error.code})
//             }
//             else {
//                 res.json(result)
//             }
//         }
//     )
// })

router.get('/follower/:userId', (req, res) => {
    const { userId } = req.params
    db.query(
        'select * from Follows join Users on Follows.followerId = Users.id where Follows.userId = ?',
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

router.get('/following/:userId', (req, res) => {
    const { userId } = req.params
    db.query(
        'select * from Follows join Users on Follows.userId = Users.id where Follows.followerId = ?',
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

router.get('/',(req,res) => {
    let followerId = req.query.followerId
    let userId = req.query.userId
    db.query(
        'select * from Follows where (followerId = ? and userId = ?)',
        [followerId,userId],
        (error, result, field) => {
            if(error) {
                res.send({error: error.code})
            }
            else {
                if (result.length > 0){
                    res.send('Unfollow')
                }
                else{
                    res.send('Follow')
                }
            }
        }
    )
})

module.exports = router