const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const token = require('../functions/token');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'first-folder') {
            cb(null, 'public/uploads/first-folder');
        } else {
            cb(null, 'public/uploads/second-folder');
        };
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname);
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('text/')) {
        cb(null, true);
    } else {
        cb(null, false);
    };
};

const upload = multer({ storage: storage, fileFilter: filter });

router.post('/leven', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), (req, res) => {
    try {
        let sources = [];
        req.files['first-folder'].forEach((file) => {
            let filePath = path.join(__dirname, '../public/uploads/first-folder', file.filename)
            fs.readFile(filePath, 'utf8', function(err, contents) {
                console.log(filePath);
                sources.push(contents);
            });
        });
        
    } catch(e) {
        console.log(e);
    };
});

router.post('/shingling', upload.array('files'), (req, res) => {

});

module.exports = router;