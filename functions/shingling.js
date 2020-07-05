const token = require('./token');
const ndd = require('near-dup-detection');

exports.getShingle = (first, second) => {
    let {
      firstToken,
      secondToken,
    } = token.getTokens(first, second);
    let result = {};
    ndd(firstToken, secondToken, 10, (err, plagiarized) => {
        if (!err) {
            result = {
                method: 'shingling',
                value: plagiarized,
              }
        }
        else {
            console.log(e);
        }
    });
    console.log(result);
    return result;
  }