const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pasta onde ficam os uploads
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadDir);
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'dados_comprovacao') {
      // aceita PDF, ZIP, TXT, imagens, vídeos, o que for
      return cb(null, true);
    }
    // para os outros campos só imagens/vídeos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      return cb(null, true);
    }
    cb(null, false);
  };

module.exports = multer({ storage, fileFilter });
