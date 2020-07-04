const express = require('express');
const router = express.Router();
const Tokenizr = require('tokenizr');
const c_rules = require('../tokenRules/c-tokenizer')
let lexer = new Tokenizr()
router.post('/', (req, res) => {
  let {
    first,
    second
  } = req.body;
  try {

    c_rules.forEach((c_rule) => {
      lexer.rule(c_rule.regex, (ctx, match) => {
        if (c_rule.type.length) {
          ctx.accept(c_rule.type)
        } else { 
          ctx.ignore()
        }
      })
   })
    lexer.rule(/[a-zA-Z_][a-zA-Z0-9_]*/, (ctx, match) => {
      ctx.accept("id")
    })
    lexer.input(first.toLowerCase());
    lexer.debug(false);
    let firstToken = ''
    lexer.tokens().forEach((token) => {
      firstToken += token.type.toString()
      console.log(token.type.toString());
    });
    console.log(firstToken)
    lexer.input(second.toLowerCase());
    lexer.debug(false);
    let secondToken = ''
    lexer.tokens().forEach((token) => {
      secondToken += token.type.toString()
      console.log(token.type.toString());
    });
    console.log(secondToken)
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})

module.exports = router;