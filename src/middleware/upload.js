const multer = require('multer')
const path = require('path')
const { failed } = require('../helper/response')

// management file
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/recipe')
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const filename = Date.now() + '' + ext
      cb(null, filename)
    }
  })
})

// middleware
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('image')
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, err, 'error', 'an error occured')
    } else {
      next()
    }
  })
}

module.exports = upload
