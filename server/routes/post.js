const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const upload = require('../middleware/UploadMiddleware')
const path = require('path');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

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

router.post('/', upload.single('image'), (req, res) => {
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