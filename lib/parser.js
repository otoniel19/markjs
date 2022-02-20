const { emojify } = require("node-emoji");
const { format } = require("prettier");
const { marked } = require("marked");
const fs = require("fs");
const utils = require("./utils");

module.exports = async function (fileName, opts) {
  //the markdown file content
  const fileString = String(fs.readFileSync(fileName));
  //parse the markdown to html
  var parseMarkdownProcess = await marked.parse(fileString);
  //if parsed markdown have emoji then render emoji
  parseMarkdownProcess = emojify(parseMarkdownProcess);
  //set html template for cdns and highlight and markdown css
  var markdownTemplate = utils.template(
    opts.theme,
    opts.output,
    parseMarkdownProcess
  );
  //use prettier to format html code
  markdownTemplate = format(markdownTemplate, {
    parser: "html",
    singleQuote: false,
    trailingComma: "none",
    useTabs: true,
    tabWidth: 2
  });
  //returns the template
  return markdownTemplate;
};
