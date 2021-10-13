const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middleware/AuthMiddleware')
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        db.query(
            "insert into Users(username,password,avatar,name,description) values (?,?,'default.webp','Full Name','Biography')",
            [username, hash],
            (error, result, field) => {
                if (error) {
                    res.send({ error: error.code })
                }
                else {
                    res.json(result)
                }
            }
        )
    })
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    var user = []
    await db.promise().query(
        'select * from Users where username = ?',
        [username]
    )
        .then(([result, field]) => {
            user = result
        })
        .catch((error) =>
            res.send({ error: error })
        )
    if (user.length < 1) {
        res.send({ error: "User doesn't exist" })
    }
    else {
        bcrypt.compare(password, user[0].password).then(async match => {
            if (!match) {
                res.send({ error: "Wrong password" })
            }
            else {
                const accessToken = sign(
                    { id: user[0].id, username: user[0].username },
                    "supersecret"
                )
                res.json({accessToken: accessToken, username: user[0].username, id: user[0].id})
            }
        })
    }
})

router.get('/',validateToken,(req,res) => {
    res.json(req.user)
})

module.exports = router