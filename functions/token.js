const Tokenizr = require('tokenizr');
const c_rules = require('./regex/c-tokenizer')

let lexer = new Tokenizr()
exports.getTokens = (...contents) => {
    c_rules.forEach((c_rule) => {
        lexer.rule(c_rule.regex, (ctx, match) => {
        if (c_rule.type.length) {
            ctx.accept(c_rule.type);
        } else {
            ctx.ignore();
        }
        });
    });
    const tokens = contents.map((content) => {
        lexer.input(content.toLowerCase());
        lexer.debug(false);
        let contentToken = '';
        lexer.tokens().forEach((token) => {
            contentToken += token.type.toString();
        });
        return contentToken;
    });
    return tokens;
};
