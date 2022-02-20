const fs = require("fs");
const shell = require("shelljs");
const logger = require("@otoniel19/logger");
const { prompt } = require("inquirer");
const emoji = require("node-emoji");
const prettier = require("prettier");
const marked = require("marked");

module.exports = async (opts) => {
  var theme = "dark";

  shell.config.silent = true;

  logger.info("parsing markdown...");

  const markedContent = await marked.parse(
    fs.readFileSync(opts.input).toString()
  );

  logger.info("markdown parsed.");

  const chooseTheme = await prompt({
    type: "list",
    choices: ["dark", "light"],
    message: "choose the theme",
    name: "opt"
  });
  if (chooseTheme.opt == "dark") theme = "dark";
  else theme = "light";

  const ContentToWriteInFile = `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${opts.output}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/atom-one-${theme}.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown-${theme}.min.css"> 
</head>

<body class="markdown-body">
   <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/highlight.min.js"></script>
   
   ${markedContent}

	 <script>
     hljs.highlightAll()
	 </script>
   
</body>

</html>
   `;
  var parsedContent = emoji.emojify(ContentToWriteInFile);
  fs.writeFileSync(opts.output, parsedContent);
  //shell.config.silent = false;
  const prettyQuestion = await prompt({
    type: "confirm",
    name: "pretty",
    message: `markdown parsing has been finished do you want to use prettier to format file?`
  });
  if (prettyQuestion.pretty) {
    logger.info("using prettier...");
    //use prettier to format content
    var pretty = await prettier.format(parsedContent, {
      trailingComma: "none",
      singleQuote: false,
      parser: "html"
    });
    global.pretty = pretty;
    fs.writeFileSync(opts.output, pretty);
    await logger.info(`file ${opts.output} formated`);
  }
  //check if wants open markdown preview in browser
  const openInServer = await prompt({
    name: "server_view",
    type: "confirm",
    message: `open markdown preview in browser?`
  });
  if (openInServer.server_view) {
    require("./preview")(global.pretty ? global.pretty : parsedContent);
  }
};
