const express = require('express');
const router = express.Router();

const multer = require('multer');
const fs = require('fs-extra');
const util = require('util');
const path = require('path');
const leven = require('../functions/leven');
const shingle = require('../functions/shingling');
const { readFileSync } = require('fs-extra');

let regex = new RegExp(/(public|private|protected)?\s+(void|byte|bool|ushort|uint|ulong|int|char|string|short|long|float|double)\s+(\w+)\s*\([^)]*\)/);
let regexArg = new RegExp(/(byte|bool|ushort|uint|ulong|int|char|string|short|long|float|double)\s+(\w+)/);

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
        let filePath = '';
        const sourcesFirst = req.files['first-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            const source = readFileSync(filePath, 'utf8');
            fs.remove(filePath, err => {
                if (err) return console.error(err);
              })
            return {
                name: file.filename,
                source: source
            };
        });
        const sourcesSecond = req.files['second-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            const source = readFileSync(filePath, 'utf8');
            fs.remove(filePath, err => {
                if (err) return console.error(err);
              })
            return {
                name: file.filename,
                source: source
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
        let filePath = '';
        const sourcesFirst = req.files['first-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            const source = readFileSync(filePath, 'utf8');
            fs.remove(filePath, err => {
                if (err) return console.error(err);
              })
            return {
                name: file.filename,
                source: source
            };
        });
        const sourcesSecond = req.files['second-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            const source = readFileSync(filePath, 'utf8');
            fs.remove(filePath, err => {
                if (err) return console.error(err);
              })
            return {
                name: file.filename,
                source: source
            };
        });
        let results = new Array();
        sourcesFirst.forEach((firstFolderFiles) => {
            sourcesSecond.forEach((secondFolderFiles) => {
                results.push({
                    firstFolderFile: firstFolderFiles.name,
                    secondFolderFile: secondFolderFiles.name,
                    plagiarized: shingle.getShingle(firstFolderFiles.source, secondFolderFiles.source)
                });
            })
        });
        res.status(200).send(results);
    } catch (e) {
        res.status(500);
        console.log(e);
    };
});

router.post('/express', upload.fields([{ name: 'first-folder', maxCount: 100 }, { name: 'second-folder', maxCount: 100 }]), (req, res) => {
    try {
        let filePath = '';
        let match = [];
        let matchArg = [];
        let fileRes = new Array();
        let args = new Array();
        let func = "";
        const filesFirst = req.files['first-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            let source = readFileSync(filePath, 'utf8');
            fileRes.length = 0;
            let hasFuncs = 0;
            while ((match = regex.exec(source)) != null) {
                hasFuncs = 1;
                args.length = 0;
                func = match[0].substr(match[0].indexOf('('));
                while ((matchArg = regexArg.exec(func)) != null) {
                    args.push({
                        arg: matchArg[0],
                        typeArg: matchArg[1],
                        nameArg: matchArg[2]
                    });
                    func = func.substr(matchArg.index + matchArg[0].length);
                }
                fileRes.push({
                    function: match[0],
                    access: match[1],
                    type: match[2],
                    name: match[3],
                    argsNum: args.length,
                    args: args.slice()
                });
                source = source.substr(match.index + match[0].length);
            };
            fs.remove(filePath);            
            return {
                fileName: file.filename,
                functions: fileRes.slice()
            };
        });
        const filesSecond = req.files['second-folder'].map((file) => {
            filePath = path.join(__dirname, '../', file.path);
            let source = readFileSync(filePath, 'utf8');
            fileRes.length = 0;
            let hasFuncs = 0;
            while ((match = regex.exec(source)) != null) {
                hasFuncs = 1;
                args.length = 0;
                func = match[0].substr(match[0].indexOf('('));
                while ((matchArg = regexArg.exec(func)) != null) {
                    args.push({
                        arg: matchArg[0],
                        typeArg: matchArg[1],
                        nameArg: matchArg[2]
                    });
                    func = func.substr(matchArg.index + matchArg[0].length);
                }
                fileRes.push({
                    function: match[0],
                    access: match[1],
                    type: match[2],
                    name: match[3],
                    argsNum: args.length,
                    args: args.slice()
                });
                source = source.substr(match.index + match[0].length);
            };
            fs.remove(filePath);
            if (hasFuncs === 0) {
                return {
                    fileName: file.filename,
                    functions: []
                };
            } else {
                return {
                    fileName: file.filename,
                    functions: fileRes.slice()
                };
            };
        });
        // console.table(filesFirst);
        // console.table(filesFirst[0].functions);
        // console.table(filesFirst[0].functions[0].args);
        // console.table(filesSecond);
        // console.table(filesSecond[0].functions);
        // console.table(filesSecond[0].functions[1].args);
        let results = new Array();
        filesFirst.forEach((fileFirst) => {
            filesSecond.forEach((fileSecond) => {
                let scoreFiles = 0;
                fileFirst.functions.forEach((functionFirst) => {
                    fileSecond.functions.forEach((functionSecond) => {
                        let scoreFunc = 0;
                        /*
                        access - 10
                        type - 20
                        argsNum - 30
                        */
                        if (functionFirst.access === functionSecond.access) {
                            scoreFunc += 10;
                        };
                        if (functionFirst.type === functionSecond.type) {
                            scoreFunc += 20;
                        };
                        let scoreArg = 0;
                        if (functionFirst.argsNum === functionSecond.argsNum) {
                            scoreFunc += 30;
                            functionFirst.args.forEach((argFirst) => {
                                try {
                                    functionSecond.args.forEach((argSecond) => {
                                        if (argFirst.typeArg === argSecond.typeArg) {
                                            scoreArg += 2;
                                            throw BreakException;
                                        };
                                    });
                                } catch(e) {

                                };
                            });
                        };
                        scoreFiles += (scoreFunc + (scoreArg / (functionFirst.args.length + functionSecond.args.length) * 40));
                    });
                });
                scoreFiles = Math.round(scoreFiles / ((fileFirst.functions.length + fileFirst.functions.length) * 50) * 100);
                results.push({
                    fileFirst: fileFirst.fileName,
                    fileSecond: fileSecond.fileName,
                    result: scoreFiles
                });
            });
        });
        console.table(results);
        res.send('end');
    } catch(e) {
        res.status(500);
        console.log(e);
    };
});

module.exports = router;