const express = require('express')
const router = express.Router()
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'App'
})

router.get('/', (req,res) => {
    db.query(
        'select * from Card',
        (error, result, field) => {
            if (error) {
                console.log(error)
            }
            else {
                res.json(result)
            }
        }
    )
})

router.post('/', (req,res) => {
    const {word, meaning} = req.body
    db.query(
        'insert into Card(word,meaning) values (?,?)',
        [word, meaning],
        (error, result, field) => {
            if (error) {
                res.send(error.code)
            }
            else {
                res.json(result)
            }
        }
    )
    console.log('Done')
})

router.get('/:word', (req,res) => {
    const { word } = req.params
    db.query(
        'select * from Card where word = ?',
        [word],
        (error, result, field) => {
            if (error) {
                res.send(error.code)
            }
            else {
                res.json(result)
            }
        }
    )
})

module.exports = router