const multer = require('multer');
const { encryptAES } = require('../controller/script')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniqueSuffix + '-' + file.originalname;
    cb(null, fileName);
  }
})

const uploadFile = multer({storage});

module.exports = uploadFile;