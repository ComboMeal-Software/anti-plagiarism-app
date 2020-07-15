const token = require('./token')

exports.getLeven = (first, second) => {
  const tokens = token.getTokens(first, second);
  const Diff = algVagnerFisher(tokens[0], tokens[1]);
  const plagiarized = Math.round((1 - Diff / (Math.max(tokens[0].length, tokens[1].length))) * 100);
  const result = {
    method: 'leven',
    value: plagiarized,
  }
  return result;
}

function algVagnerFisher(first, second) {
  let n = first.length;
  let m = second.length;
  if (n == 0) return m;
  if (m == 0) return n;
  let table = [];
  let firstRow = [];
  for (i = 0; i <= n; i++){
    firstRow.push(i);
  }
  table.push(firstRow);
  for (i = 1; i <= m; i++){
    let newRow = new Array(n + 1);
    newRow[0] = i;
    table.push(newRow);
  }
  let cost = 0;
  for (i = 1; i <= n; i++){
    for (j = 1; j <= m; j++) {
      if (first[i] == second[j])
        cost = 0;
      else
        cost = 1;
      
      table[j][i] = Math.min(table[j-1][i] + 1, table[j][i-1] + 1, table[j-1][i-1] + cost);
    }
  }
  return table[m][n];
}