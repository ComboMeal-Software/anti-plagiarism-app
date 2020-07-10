const leven = require('leven');
const token = require('./token')

exports.getLeven = (...contents) => {
  const tokens = token.getTokens(contents);
  const Diff = leven(tokens[0], tokens[1]);
  const plagiarized = (1 - Diff / (Math.max(tokens[0].length, tokens[1].length))) * 100;
  const result = {
    method: 'leven',
    value: plagiarized,
  }
  return result;
}