const express = require('express');
const router = express.Router();
const { normalizeText } = require('normalize-text');
const Tokenizr = require('tokenizr');
const c_rules = require('../tokenRules/c-tokenizer')
const lexer = new Tokenizr()
router.post('/', (req, res) => {
  let {
    first,
    second
  } = req.body;
  try {
    first = normalizeText([req.body.first]);
    second = normalizeText([req.body.second]);
    
    c_rules.forEach(rule => {
      lexer.rule(rule.regex, (ctx, match) => {
        ctx.accept(rule.type)
      })
      lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
        ctx.ignore()
      })
      lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
        ctx.ignore()
      })
    });
    lexer.input(first);
    lexer.debug(false);
    lexer.tokens().forEach((token) => {
      console.log(token.toString())
    });
    console.log('Second file');
    lexer.input(second);
    lexer.debug(false);
    lexer.tokens().forEach((token) => {
    });
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})

module.exports = router;