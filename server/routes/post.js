const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

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

router.post('/', (req, res) => {
    const {userId, image, body} = req.body
    db.query(
        'insert into Posts(userId, image, body) values (?,?,?)',
        [userId,image,body],
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
    const {id} = req.body
    db.query(
        'delete from Posts where id = ?',
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

router.get('/feed/:userId', (req,res) => {
    const {userId} = req.params
    db.query(
        'select * from Posts join Follows on Posts.userId = Follows.userId where Follows.followerId = ?',
        [userId],
        (error, result, field) => {
            if(error) {
                res.send({error: error.code})
            }
            else {
                res.json(result)
                console.log(result)
            }
        }
    )
})

module.exports = router