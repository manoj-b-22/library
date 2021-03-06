const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.relative(__dirname, 'backend_librarymangement/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage: storage })