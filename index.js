#!/usr/bin/env node
const { program } = require("commander");
const { readFileSync } = require("fs");
const { log } = require("console");

program.version(
  require("./package.json").version,
  "-v,--version",
  "show md-parser version"
);

program
  .option("-i,--input <file>", "the markdown file to parse")
  .option("-o,--output <file>", "the file to write parsed markdown")
  .description("parse markdown to html")
  .usage("-i <file> -o <file>")
  .action((opts) => {
    require("./lib/parser")(opts);
  });

program.parse(process.argv);
