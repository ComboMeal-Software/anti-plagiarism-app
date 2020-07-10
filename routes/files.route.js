const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs-extra');
const util = require('util');
const path = require('path');
const leven = require('../functions/leven');
const shingle = require('../functions/shingling');
const { readFileSync } = require('fs-extra');

const getLevenWait = util.promisify(leven.getLeven);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'first-folder') {
            fs.mkdirp('public/uploads/first-folder', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    cb(null, 'public/uploads/first-folder');
                }
            })
        } else {
            fs.mkdirp('public/uploads/second-folder', (err) => {
                if (err) {
                    console.log(err);
                } else {
                    cb(null, 'public/uploads/second-folder');
                }
            });
        };
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.fieldname + '-' + file.originalname);
    }
});

const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('text/')) {
        cb(null, true);
    } else {
        cb(null, false);
    };
};

const upload = multer({ storage: storage });

router.post('/leven', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), (req, res) => {
    try {
        console.log('files uploaded');
        let filePath = '';
        const sourcesFirst = req.files['first-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            return {
                name: file.originalname,
                source: readFileSync(filePath, 'utf8')
            };
        });
        const sourcesSecond = req.files['second-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            return {
                name: file.originalname,
                source: fs.readFileSync(filePath, 'utf8')
            };
        })
        let results = new Array()
        sourcesFirst.forEach((firstFolderFiles) => {
            sourcesSecond.forEach((secondFolderFiles) => {
                results.push({
                    firstFolderFile: firstFolderFiles.name,
                    secondFolderFile: secondFolderFiles.name,
                    plagiarized: leven.getLeven(firstFolderFiles.source, secondFolderFiles.source)
                })
            })
        })
        res.status(200).send(results);
    } catch (e) {
        res.status(500);
        console.log(e);
    };
});

router.post('/shingling', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), (req, res) => {
    try {
        console.log('files uploaded');
        let filePath = '';
        const sourcesFirst = req.files['first-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            return {
                name: file.originalname,
                source: readFileSync(filePath, 'utf8')
            };
        });
        const sourcesSecond = req.files['second-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            return {
                name: file.originalname,
                source: fs.readFileSync(filePath, 'utf8')
            };
        })
        let results = new Array()
        sourcesFirst.forEach((firstFolderFiles) => {
            sourcesSecond.forEach((secondFolderFiles) => {
                results.push({
                    firstFolderFile: firstFolderFiles.name,
                    secondFolderFile: secondFolderFiles.name,
                    plagiarized: shingle.getShingle(firstFolderFiles.source, secondFolderFiles.source)
                });
            })
        })
        res.status(200).send(results);
    } catch (e) {
        res.status(500);
        console.log(e);
    };
});

module.exports = router;