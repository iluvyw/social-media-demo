const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const upload = require('../middleware/AvatarMiddleware')
const path = require('path')
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

router.use('/images',express.static(path.join(path.resolve(__dirname,'..'),'/Avatars/')))

router.put('/', [validateToken,upload.single('image')], async (req, res) => {
    const {userId} = req.body
    const image = req.imageName
    db.query(
        'select * from Users where id = ?',
        [userId],
        (error, result, field) => {
            if(error) {
                res.send({error: error.code})
            }
            else {
                if (result[0].avatar !== "default.webp"){
                    unlinkAsync(path.join(path.resolve(__dirname,'..'),'/Avatars/',result[0].avatar))
                }
            }
        }
    )
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

router.put('/update',validateToken, (req, res) => {
    const {userId,name,description} = req.query
    if (name){
        db.query(
            'update Users set name = ? where id = ?',
            [name,userId],
            (error, result, field) => {
                if(error) {
                    res.send({error: error.code})
                }
                else {
                    res.json(result)
                }
            }
        )
    }
    if (description){
        db.query(
            'update Users set description = ? where id = ?',
            [description,userId],
            (error, result, field) => {
                if(error) {
                    res.send({error: error.code})
                }
                else {
                    res.json(result)
                }
            }
        )
    }
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

router.delete('/:id',validateToken, (req,res) => {
    const {id} = req.params
    db.query(
        'delete from Follows where userId = ? or followerId = ?',
        [id,id],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                console.log(result)
            }
        }
    )
    db.query(
        'delete from Comments where userId = ?',
        [id],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                console.log(result)
            }
        }
    )
    db.query(
        'select * from Posts where userId = ?',
        [id],
        (error, result, field) => {
            if(error) {
                console.log('error')
                res.send({error: error})
            }
            else {
                for (let i=0;i<result.length;i++){
                    unlinkAsync(path.join(path.resolve(__dirname,'..'),'/Images/',result[i].image))
                }
                console.log('Done delete user all post')
            }
        }
    ) 
    db.query(
        'delete from Posts where userId = ?',
        [id],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                console.log(result)
            }
        }
    )
    db.query(
        'select * from Users where id = ?',
        [id],
        (error, result, field) => {
            if(error) {
                res.send({error: error.code})
            }
            else {
                if (result[0].avatar !== "default.webp"){
                    unlinkAsync(path.join(path.resolve(__dirname,'..'),'/Avatars/',result[0].avatar))
                }
                console.log('Done delete user avatar')
            }
        }
    )
    db.query(
        'delete from Users where id = ?',
        [id],
        (error, result, field) => {
            if (error) {
                res.send({error: error.code})
            }
            else {
                res.send(result)
            }
        }
    )
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