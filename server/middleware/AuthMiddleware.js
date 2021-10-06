const {verify} = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const token = req.header("accessToken")

    if (!token) {
        res.send({error: "User not logged in"})
    }
    else {
        try{
            const validToken = verify(token,"supersecret")
            req.user = validToken
            if (validToken){
                next()
            }
        }
        catch(error){
            res.send({error: error})
        }
    }
}

module.exports = {validateToken}