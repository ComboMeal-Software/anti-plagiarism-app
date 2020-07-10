const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs-extra').promises;
const util = require('util');
const path = require('path');
const leven = require('../functions/leven');
const shingle = require('../functions/shingling');

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

const upload = multer({ storage: storage, fileFilter: filter });

router.post('/leven', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), async (req, res) => {
    try {
        console.log('files uploaded');
        const sourcesFirst = new Array();
        let filePath = '';
        for (const file of req.files['first-folder']) {
            filePath = path.join(__dirname, '../', file.path);
            fs.readFile(filePath, 'utf8')
            sourcesFirst.push([file.filename, await fs.readFile(filePath, 'utf8')]);
        }
        const sourcesSecond = new Array();
        for (const file of req.files['second-folder']) {
            filePath = path.join(__dirname, '../', file.path);
            sourcesSecond.push([file.filename, await fs.readFile(filePath, 'utf8')]);
        }
        let results = new Array();
        for (const sourceFirst of sourcesFirst) {
            for (const sourceSecond of sourcesSecond) {
                results.push([sourceFirst[0], sourceSecond[0], leven.getLeven(sourceFirst[1], sourceSecond[1])]);
            }
        }
        console.table(results);
        res.send('end');
    } catch (e) {
        res.status(500);
        console.log(e);
    };
});

router.post('/shingling', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), async (req, res) => {
    try {
        console.log('files uploaded');
        const sourcesFirst = new Array();
        let filePath = '';
        for (const file of req.files['first-folder']) {
            filePath = path.join(__dirname, '../', file.path);
            sourcesFirst.push({
                name: file.filename,
                source: await fs.readFile(filePath, 'utf8')
            });
        }
        const sourcesSecond = new Array();
        for (const file of req.files['second-folder']) {
            filePath = path.join(__dirname, '../', file.path);
            sourcesSecond.push({
                name: file.filename,
                source: await fs.readFile(filePath, 'utf8')
            });
        }
        let results = new Array()
        sourceFirst.forEach((firstFolderFiles) => {
            sourceSecond.forEach((secondFolderFiles) => {
                results.push([firstFolderFiles.name, secondFolderFiles.name, shingle.getShingle(firstFolderFiles.source, secondFolderFiles.source)]);
            })
        })
        console.table(results);
        res.send('end');
    } catch (e) {
        res.status(500);
        console.log(e);
    };
});

module.exports = router;