const token = require('./token');
const CRC32 = require('crc-32');

exports.getShingle = (first, second, N) => {
    let {
      firstToken,
      secondToken,
    } = token.getTokens(first, second);
    let firstShingles = [];
    for (let i = 0; i + N <= firstToken.length; i++) {
      firstShingles.push(firstToken.substr(i, N));
    }
    let firstHash = [];
    firstShingles.forEach(function(item, i, arr) {
      firstHash.push(CRC32.str(item));
    })

    let secondShingles = [];
    for (let i = 0; i + N <= secondToken.length; i++) {
      secondShingles.push(secondToken.substr(i, N));
    }
    let secondHash = [];
    secondShingles.forEach(function(item, i, arr) {
      secondHash.push(CRC32.str(item));
    })
    
    let similarHash = [];
    firstHash.forEach(function(item1, i1, arr1) {
      secondHash.forEach(function(item2, i2, arr2){
        if ((item1 == item2) && (similarHash.indexOf(item1) == -1)){
          similarHash.push(item1);
        }
      })
    })

    const plagiarized = (similarHash.length/(firstHash.length + secondHash.length - 2 * similarHash.length)) * 100;
    const result = {
      method: 'shingling',
      value: plagiarized,
    }
    console.log(result);
    return result;
  }