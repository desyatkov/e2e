const fs = require('fs');
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const chalk = require('chalk');
const file = fs.readFileSync(path.resolve(__dirname, "../testFunc/exampleFunctions.js")).toString();
const ast = parser.parse(file, {sourceType: 'module'});
const listFunctions = [];
function findNested(obj, key, memo) {
  let i,
    proto = Object.prototype,
    ts = proto.toString,
    hasOwn = proto.hasOwnProperty.bind(obj);

  if ('[object Array]' !== ts.call(memo)) memo = [];

  for (i in obj) {
    if (hasOwn(i)) {
      if (i === key) {
        memo.push(obj[i]);
      } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
        findNested(obj[i], key, memo);
      }
    }
  }

  return memo;
}

const descr = chalk.blueBright;

traverse(ast, {
  FunctionDeclaration: function(path) {
    const fooName = path.node.id.name;
    const obj = {
      name: `test: ${chalk.magentaBright(fooName)} ${ descr('[ ')}${descr(findNested(path.node.body, "value")[0])}${descr(']')}`,
      value: fooName,
      short: fooName,
      disabled: false
    };

    listFunctions.push(obj)
  }
});

module.exports = listFunctions;
