const token = require('./token');
const CRC32 = require('crc-32');
const intersection = require('array-intersection');
const union = require('array-union');

exports.getShingle = (first, second) => {
    shingleLength = 4;
    const tokens = token.getTokens(first, second);
    let firstShingles = [];
    for (let i = 0; i + shingleLength <= tokens[0].length; i++) {
      if (firstShingles.indexOf(tokens[0].substr(i, shingleLength)) == -1)
        firstShingles.push(tokens[0].substr(i, shingleLength));
    }
    let firstHash = [];
    firstShingles.forEach(function(item, i, arr) {
      firstHash.push(CRC32.str(item));
    })

    let secondShingles = [];
    for (let i = 0; i + shingleLength <= tokens[1].length; i++) {
      if (secondShingles.indexOf(tokens[1].substr(i, shingleLength)) == -1)
        secondShingles.push(tokens[1].substr(i, shingleLength));
    }
    let secondHash = [];
    secondShingles.forEach(function(item, i, arr) {
      secondHash.push(CRC32.str(item));
    })

    const plagiarized = Math.round(intersection(firstHash, secondHash).length / union(firstHash, secondHash).length * 100);
    const result = {
      method: 'shingling',
      value: plagiarized,
    }
    return result;
  }