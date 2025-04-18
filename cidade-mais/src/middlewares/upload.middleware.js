const multer = require('multer');
const storage = require('../config/multerConfig');

const upload = multer({ storage });

module.exports = upload;
