const parser = require("./lib/parser");

module.exports = function (fileName, theme) {
  return parser(fileName, { output: fileName, theme: theme });
};
