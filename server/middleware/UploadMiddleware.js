const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images")
    },
    filename: (req, file, cb) => {
        req.imageName = Date.now() + path.extname(file.originalname)
        cb(null, req.imageName)
    }
})

const upload = multer({storage: storage})

module.exports = upload

