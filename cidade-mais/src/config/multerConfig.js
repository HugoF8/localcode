const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta 'uploads/' existe
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Define onde os ficheiros serão armazenados e com que nome
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Validação do tipo de ficheiro: apenas imagens
const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Apenas ficheiros de imagem são permitidos'), false);
    }
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;