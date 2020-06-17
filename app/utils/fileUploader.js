var multer  = require('multer');
const moment = require('moment');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './app/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, `${req.body.title}.${filetype}`);
    }
});

var upload = multer({storage: storage});

module.exports = upload;