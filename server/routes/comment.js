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

router.get('/:postId', (req, res) => {
    const {postId} = req.params
    db.query(
        'select * from Comments where postId = ?',
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

router.post('/',validateToken, (req, res) => {
    const {userId, postId, body} = req.body
    db.query(
        'insert into Comments(postId, userId, body, createAt) values (?,?,?,now())',
        [postId,userId,body],
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

router.delete('/',validateToken, (req, res) => {
    const {id} = req.body
    db.query(
        'delete from Comments where id = ?',
        [id],
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