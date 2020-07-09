const express = require('express');
const router = express.Router();
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post('/leven', upload.any('files', 100), (req, res) => {
    req.files.forEach(function(item) {
        
    })
});

router.post('/shingling', upload.any('files', 100), (req, res) => {

});