const { clear } = require("console");
const fs = require("fs");
const logger = require("@otoniel19/logger");

function clearConsole() {
  process.stdout.write("\033c");
}

function parseAndWrite(content, out, theme) {
  clearConsole();
  const { format } = require("prettier");
  const { parse } = require("marked");
  const { emojify } = require("node-emoji");
  var markedContent = parse(content);
  markedContent = emojify(markedContent);

  const ContentToWriteInFile = `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${out}</title>
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
  const formatedHtml = format(ContentToWriteInFile, {
    parser: "html",
    trailingComma: "none",
    singleQuote: false
  });

  fs.writeFileSync(out, formatedHtml);
  logger.info(`writed to ${out}`);
  return formatedHtml;
}

module.exports = (file, out, mode, theme) => {
  if (mode == "watch_write") {
    clearConsole();
    logger.warn(`${file} starting compilation....`);
    //initial parse
    parseAndWrite(fs.readFileSync(file).toString(), out, theme);
    //watch file
    fs.watchFile(file, { interval: 0, persistent: true }, (curr, prev) => {
      clear();
      logger.warn(`${file} changed starting compilation....`);
      //parse and write markdown
      parseAndWrite(fs.readFileSync(file).toString(), out, theme);
    });
  } else {
    clear();
    logger.warn(`${file} starting compilation....`);
    let htmlInit = parseAndWrite(fs.readFileSync(file).toString(), out, theme);
    //initial server call

    require("./preview").c(htmlInit);
    //watch changes
    fs.watchFile(file, { interval: 0, persistent: true }, (curr, prev) => {
      clear();
      logger.warn(`${file} changed starting compilation....`);
      //parse and format markdown
      let html = parseAndWrite(fs.readFileSync(file).toString(), out, theme);
      //call the server
      const svApp = require("./preview");
      svApp.restartServer();
      svApp.c(html);
    });
  }
};
