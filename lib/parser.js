module.exports = async (opts) => {
  const fs = require("fs");
  const shell = require("shelljs");
  const logger = require("@otoniel19/logger");
  const { prompt } = require("inquirer");

  shell.config.silent = true;

  logger.info("parsing markdown...");

  const markedContent = await shell
    .exec(`npx marked -i ${opts.input}`)
    .stdout.toString();
  logger.info("markdown parsed.");

  const ContentToWriteInFile = `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${opts.output}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/atom-one-dark.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown-dark.min.css"> 
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
  fs.writeFileSync(opts.output, ContentToWriteInFile);
  //shell.config.silent = false;
  const prettyQuestion = await prompt({
    type: "confirm",
    name: "pretty",
    message: `markdown parsing has been finished do you want to use prettier to format file?`
  });
  if (prettyQuestion.pretty) {
    logger.info("using prettier...");
    await shell.exec(`npx prettier -w ${opts.output} --parser html`);
    logger.info(`file ${opts.output} formated`);
  } else process.exit();
};
