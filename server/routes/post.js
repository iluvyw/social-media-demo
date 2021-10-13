const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const upload = require('../middleware/UploadMiddleware')
const path = require('path');
const { validateToken } = require('../middleware/AuthMiddleware')
const fs = require('fs')
const {promisify} = require('util')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const unlinkAsync = promisify(fs.unlink)

router.use('/images',express.static(path.join(path.resolve(__dirname,'..'),'/Images/')))

router.get('/:userId', (req, res) => {
    const {userId} = req.params
    db.query(
        'select * from Posts where userId = ?',
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

router.get('/id/:postId', (req, res) => {
    const {postId} = req.params
    db.query(
        'select * from Posts where id = ?',
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

router.post('/', [validateToken,upload.single('image')], (req, res) => {
    const {userId, username, body} = req.body
    const image = req.imageName
    db.query(
        'insert into Posts(userId, username, image, body, createAt) values (?,?,?,?,now())',
        [userId,username,image,body],
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
        'delete from Comments where postId = ?',
        [id],
        (error, result, field) => {
            if(error) {
                res.send({error: error})
            }
            else {
                console.log('Done delete comments')
            }
        }
    ) 
    db.query(
        'select * from Posts where id = ?',
        [id],
        (error, result, field) => {
            if(error) {
                console.log('error')
                res.send({error: error})
            }
            else {
                unlinkAsync(path.join(path.resolve(__dirname,'..'),'/Images/',result[0].image))
            }
        }
    ) 
    db.query(
        'delete from Posts where id = ?',
        [id],
        (error, result, field) => {
            if(error) {
                res.send({error: error})
            }
            else {
                res.json(result)
            }
        }
    ) 
})

router.get('/feed/:userId', (req,res) => {
    const {userId} = req.params
    db.query(
        'select * from Posts join Follows on Posts.userId = Follows.userId where Follows.followerId = ? order by Posts.createAt desc',
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

module.exports = router