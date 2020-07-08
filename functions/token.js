const Tokenizr = require('tokenizr');
const c_rules = require('../tokenRules/c-tokenizer')

let lexer = new Tokenizr()
exports.getTokens = (first, second) => {
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
    return { firstToken, secondToken }
};
