#!/usr/bin/env node
const { program } = require("commander");
const { readFileSync } = require("fs");
const { prompt } = require("inquirer");

program.version(
  require("../package.json").version,
  "-v,--version",
  "show md-parser version"
);

program
  .command("parse <file>")
  .option("-o,--output <file>", "the file to write parsed markdown")
  .description("parse markdown to html")
  .usage("-i <file> -o <file>")
  .action((file, opts) => {
    var options = Object.assign(opts, { input: file });
    require("../lib/parser")(options);
  });

program
  .command("open <file>")
  .usage("<file>")
  .option("-t,--theme <name>", "theme to markdown preview 'dark' or 'light' ")
  .description("preview the parsed markdown in server")
  .action((file, { theme }) => {
    require("../lib/open")(file, theme);
  });

program
  .command("watch <file>")
  .option("-o,--output <file>", "the filename to output changes")
  .description("watch file and write changes")
  .usage("<file> -o <outputFile>")
  .action(async (file, opts) => {
    const { theme } = await prompt({
      type: "list",
      choices: ["light", "dark"],
      message: "choose theme",
      name: "theme"
    });
    const mode = await prompt({
      type: "list",
      choices: ["watch and write", "watch and preview in the browser"],
      name: "mode"
    });
    mode.mode == "watch and preview in the browser"
      ? require("../lib/watch")(file, opts.output, "watch_browser", theme)
      : require("../lib/watch")(file, opts.output, "watch_write", theme);
  });

program.parse(process.argv);
