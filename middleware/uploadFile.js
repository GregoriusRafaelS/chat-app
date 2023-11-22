const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    // Makai base64 image encoded
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   console.log(reader.result);
    //   reader.readAsDataURL(file)
    // })
    // cb(null, file.originalname)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
})

const uploadFile = multer({storage});

module.exports = uploadFile;