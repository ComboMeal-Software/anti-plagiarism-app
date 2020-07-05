const express = require('express');
const router = express.Router();
const Tokenizr = require('tokenizr');
const c_rules = require('../tokenRules/c-tokenizer')
const leven = require('leven');
let lexer = new Tokenizr()
router.post('/leven', (req, res) => {
  let {
    first,
    second,
  } = req.body;
  try {
    c_rules.forEach((c_rule) => {
      lexer.rule(c_rule.regex, (ctx, match) => {
        if (c_rule.type.length) {
          ctx.accept(c_rule.type);
        } else {
          ctx.ignore();
        }
      });
    });
    lexer.input(first.toLowerCase());
    lexer.debug(false);
    let firstToken = '';
    lexer.tokens().forEach((token) => {
      firstToken += token.type.toString();
    });
    lexer.input(second.toLowerCase());
    lexer.debug(false);
    let secondToken = '';
    lexer.tokens().forEach((token) => {
      secondToken += token.type.toString();
    });
    const Diff = leven(firstToken, secondToken);
    const plagiarized = (1 - Diff / (Math.max(firstToken.length, secondToken.length))) * 100;
    const result = {
      method: 'leven',
      value: plagiarized,
    }
    res.status(200).json({
      result,
    });
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})

module.exports = router;