module.exports = (file, theme) => {
  //clear terminal
  process.stdout.write("\033c");
  const { watchFile, readFileSync } = require("fs");
  const { info, warn } = require("@otoniel19/logger");
  const { parse } = require("marked");
  const { format } = require("prettier");
  const { emojify } = require("node-emoji");
  info(`${file} starting compilation...`);

  var markedContent = parse(readFileSync(file).toString());
  markedContent = emojify(markedContent);
  var ContentToWriteInFile = `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${file}</title>
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
  ContentToWriteInFile = format(ContentToWriteInFile, {
    parser: "html",
    singleQuote: false,
    trailingComma: "none"
  });

  require("./preview").c(ContentToWriteInFile);
  //watch changes
  watchFile(file, { persistent: true, interval: 0 }, (curr, prev) => {
    //try to clear terminal
    process.stdout.write("\033c");
    info(`${file} changed starting compilation...`);
    var markedContent = parse(readFileSync(file).toString());
    markedContent = emojify(markedContent);
    var ContentToWriteInFile = `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${file}</title>
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
    ContentToWriteInFile = format(ContentToWriteInFile, {
      parser: "html",
      singleQuote: false,
      trailingComma: "none"
    });

    var app = require("./preview");
    app.restartServer();
    app.c(ContentToWriteInFile);
  });
};
