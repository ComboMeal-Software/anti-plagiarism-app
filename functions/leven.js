const leven = require('leven');
const token = require('./token')

exports.getLeven = (first, second) => {
  let {
    firstToken,
    secondToken,
  } = token.getTokens(first, second);
  const Diff = leven(firstToken, secondToken);
  const plagiarized = (1 - Diff / (Math.max(firstToken.length, secondToken.length))) * 100;
  const result = {
    method: 'leven',
    value: plagiarized,
  }
  return result;
}