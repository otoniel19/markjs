const { spawnSync } = require("child_process");
const { red, blue, yellow } = require("chalk");

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
  logger() {
    return {
      info: (...msgs) => console.log.apply(this, [blue("info"), ...msgs]),
      error: (...msgs) => console.log.apply(this, [red("error"), ...msgs]),
      warn: (...msgs) => console.log.apply(this, [yellow("warning"), ...msgs]),
      faltalError: (...msgs) => {
        console.log.apply(this, [red("error"), ...msgs]);
        process.exit();
      }
    };
  }
  shell(commandAndArgs) {
    const cmd = commandAndArgs.split(" ");
    const name = cmd[0];
    cmd.shift();
    const runShell = spawnSync(name, cmd, { shell: true, stdio: "inherit" });
  }
}

module.exports = new Utils();
