const { spawnSync } = require("child_process");

class Utils {
  //html template for md-parser
  template(theme, fileName, markdownContent) {
    return `
       <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${fileName}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/atom-one-${theme}.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.1.0/github-markdown-${theme}.min.css">
</head>

<body class="markdown-body">
   <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/highlight.min.js"></script>

          ${markdownContent}

         <script>
     hljs.highlightAll()
         </script>

</body>

</html> 
    `;
  }
  clear() {
    spawnSync("clear", ["-x"], { stdio: "inherit", shell: true });
  }
}

module.exports = new Utils();
