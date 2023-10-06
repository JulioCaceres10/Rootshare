import multer from 'multer'
import path from 'path'
import {generateId} from '../helpers/token.js'

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './public/uploads/')
    // },
    filename: function (req, file, cb) {
        cb(null, generateId() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

export default upload