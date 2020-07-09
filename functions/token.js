const Tokenizr = require('tokenizr');
const c_rules = require('../tokenRules/c-tokenizer')

let lexer = new Tokenizr()
exports.getTokens = (...strings) => {
    c_rules.forEach((c_rule) => {
        lexer.rule(c_rule.regex, (ctx, match) => {
        if (c_rule.type.length) {
            ctx.accept(c_rule.type);
        } else {
            ctx.ignore();
        }
        });
    });
    const tokens = strings.map((string) => {
        lexer.input(string.toLowerCase());
        lexer.debug(false);
        let stringToken = '';
        lexer.tokens().forEach((token) => {
            stringToken += token.type.toString();
        });
        return stringToken;
    });
    return tokens;
};
