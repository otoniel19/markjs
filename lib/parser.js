const { format } = require("prettier");
const { Converter } = require("showdown");
const fs = require("fs");
const utils = require("./utils");
const log = utils.logger();
//the markdown parser to use
const parser = new Converter({
  emoji: true,
  ghCodeBlocks: true,
  tables: true,
  underline: true,
  rawHeaderId: true
});

module.exports = async function (fileName, opts) {
  if (!fs.existsSync(fileName))
    log.faltalError(`error on parse file ${fileName} file not found`);
  //the markdown file content
  var fileString = String(fs.readFileSync(fileName));
  //parse the markdown to html
  var parseMarkdownProcess = await parser.makeHtml(fileString);
  //set html template for cdns and highlight and markdown css
  var markdownTemplate = utils.template(
    opts.theme,
    opts.output,
    parseMarkdownProcess
  );
  //returns the template
  return markdownTemplate;
};
