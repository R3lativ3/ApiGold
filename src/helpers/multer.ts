import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/../../uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getMilliseconds()+file.originalname)
    }
})

export default multer({ storage }) 