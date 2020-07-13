exports.analyzeSignatures = (filesFirst, filesSecond) => {
    let results = new Array();
    filesFirst.forEach((fileFirst) => {
        filesSecond.forEach((fileSecond) => {
            let scoreFiles = 0;
            fileFirst.functions.forEach((functionFirst) => {
                fileSecond.functions.forEach((functionSecond) => {
                    let scoreFunc = 0;
                    if (functionFirst.access === functionSecond.access) {
                        scoreFunc += 10;
                    };
                    if (functionFirst.type === functionSecond.type) {
                        scoreFunc += 20;
                    };
                    let scoreArg = 0;
                    if (functionFirst.argsNum === functionSecond.argsNum && functionFirst.argsNum !== 0) {
                        scoreFunc += 30;
                        functionFirst.args.forEach((argFirst) => {
                                functionSecond.args.forEach((argSecond) => {
                                    if (argFirst.typeArg === argSecond.typeArg) {
                                        scoreArg += 1;
                                    };
                                });
                        });
                    };
                    if (Math.min(functionFirst.args.length, functionSecond.args.length) === 0) {
                        scoreFiles += scoreFunc;
                    } else {
                        scoreFiles += (scoreFunc + (scoreArg / (functionFirst.args.length * functionSecond.args.length) * 40));
                    };
                    
                });
            });
            if (Math.min(fileFirst.functions.length, fileSecond.functions.length) === 0) {
                scoreFiles = 0;
            } else {
                scoreFiles = Math.round(scoreFiles / ((fileFirst.functions.length * fileSecond.functions.length) * 100) * 100);
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