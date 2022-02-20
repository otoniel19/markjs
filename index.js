function parse(file, theme) {
  const { readFileSync } = require("fs");
  const { parse } = require("marked");
  const { format } = require("prettier");
  const { emojify } = require("node-emoji");
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
  return ContentToWriteInFile;
}

module.exports = parse;
