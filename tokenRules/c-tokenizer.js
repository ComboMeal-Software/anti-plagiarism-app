module.exports = [
  { regex: /[a-zA-Z_][a-zA-Z0-9_]*/, type: 'i' },
  { regex: /[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/, type: 'n' },
  { regex: /"((?:\\"|[^\r\n])*)"/, type: 's' },
  { regex: /\/\/[^\r\n]*\r?\n/, type: '' },
  { regex: /[ \t\r\n]+/, type: '' },
  { regex: /^"([^"\n]|\\")*"?$/, type: 'q' },
  { regex: /^'[^']*$/, type: 'h' },
  { regex: /^#(\S*)$/, type: 'd' },
  { regex: /^\($/, type: 'p' },
  { regex: /^\)$/, type: 'a' },
  { regex: /^\[$/, type: 's' },
  { regex: /^\]$/, type: 'u' },
  { regex: /^{$/, type: 'r' },
  { regex: /^}$/, type: 'l' },
  {
    regex: /([-<>~!%&*\/+=?|.,:;]|->|<<|>>|\*\*|\|\||&&|--|\+\+|[-+*|&%\/=]=)/,
    type: 'o'
  },
  { regex: /\\\n?/, type: 'e' },
  { regex: /./, type: 'c' },
]

/*
string - s
quote - q
char - c
char continue - h
directive - d
open parenthesis - p
close parenthesis - a
open square - s
close square - u
open curly - r
close curly - l
operator - o
identifier - i
number - n
whitespace - w
line continue - e
*/