const multer = require('multer');
const { storage, fileFilter } = require('../config/multerConfig');

const upload = multer({ storage, fileFilter });

module.exports = upload;
