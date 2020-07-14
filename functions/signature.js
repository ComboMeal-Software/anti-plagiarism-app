const fs = require('fs-extra');
const { readFileSync } = require('fs-extra');
const path = require('path');

let regex = new RegExp(/(public|private|protected)\s+(void|byte|bool|ushort|uint|ulong|int|char|string|short|long|float|double)\s+(?!main|Main)(\w+)\s*\([^)]*\)/);
let regexArg = new RegExp(/(byte|bool|ushort|uint|ulong|int|char|string|short|long|float|double)\s+(\w+)/);

exports.getSignatures = (files, folder) => {
    let filePath = '';
    let match = [];
    let matchArg = [];
    let fileRes = new Array();
    let args = new Array();
    let func = "";
    return files[folder].map((file) => {
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
}

exports.analyzeSignatures = (filesFirst, filesSecond) => {
    let results = new Array();
    filesFirst.forEach((fileFirst) => {
        filesSecond.forEach((fileSecond) => {
            let scoreFiles = 0;
            
            fileFirst.functions.forEach((functionFirst) => {
                let scoresTemp = new Array();
                fileSecond.functions.forEach((functionSecond) => {
                    let scoreTemp = 0;
                    if (functionFirst.access === functionSecond.access) {
                        scoreTemp += 10;
                    };
                    if (functionFirst.type === functionSecond.type) {
                        scoreTemp += 20;
                    };
                    let scoreArg = 0;
                    if (functionFirst.argsNum === functionSecond.argsNum && functionFirst.argsNum !== 0) {
                        scoreTemp += 30;
                        let secondArgsTemp = functionSecond.args.slice();
                        functionFirst.args.forEach((argFirst) => {
                            try {
                                secondArgsTemp.forEach((argSecond) => {
                                    if (argFirst.typeArg === argSecond.typeArg) {
                                        scoreArg += 1;
                                        secondArgsTemp.splice(secondArgsTemp.indexOf(argSecond), 1);
                                        throw breakException
                                    };
                                });
                            } catch(e) {

                            }
                        });
                    };
                    if (Math.min(functionFirst.args.length, functionSecond.args.length) === 0) {
                        scoresTemp.push(scoreTemp);
                    } else {
                        scoresTemp.push((scoreTemp + (scoreArg / (Math.min(functionFirst.args.length, functionSecond.args.length)) * 40)));
                    };
                });
                scoreFiles += Math.max.apply(Math, scoresTemp);
            });
            if (Math.min(fileFirst.functions.length, fileSecond.functions.length) === 0) {
                scoreFiles = 0;
            } else {
                scoreFiles = Math.round(scoreFiles / ((Math.max(fileFirst.functions.length, fileSecond.functions.length)) * 100) * 100);
            };
            const result = {
                method: 'express',
                value: scoreFiles
            }
            results.push({
                firstFolderFile: fileFirst.fileName,
                secondFolderFile: fileSecond.fileName,
                plagiarized: result
            });
        });
    });
    return results;
};