const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const token = require('../functions/token');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post('/leven', upload.any('files'), (req, res) => {
    try {
        req.files.forEach((item) => {
            let filePath = path.join(__dirname, '../public/uploads/', item.filename)
            fs.readFile(filePath, 'utf8', function(err, contents) {
                console.log(filePath);
                let {
                    firstToken,
                    secondToken,
                  } = token.getTokens(contents, ' ');
                console.log(firstToken);
            });
        });
    } catch(e) {
        console.log(e);
    };
});

router.post('/shingling', upload.array('files'), (req, res) => {

});

module.exports = router;