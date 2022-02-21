#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const logger = require("@otoniel19/logger");
//the markdown parser
const parser = require("../lib/parser");
const { spawnSync } = require("child_process");

//version of markjs
program.version(
  require("../package.json").version,
  "-v,--version",
  "show markjs version"
);

//the command to parse markdown to html
program
  .command("parse <file>")
  .description("parse the markdown to html")
  .option(
    "-t,--theme [themeName]",
    "the theme to use type 'dark' | 'light'",
    "dark"
  )
  .requiredOption(
    "-o,--output <outputFile>",
    "the file to write the parsed markdown"
  )
  .action(async (fileName, opts) => {
    logger.info(`parsing markdown...`);
    //use the parser to parse content
    const parseContent = await parser(fileName, opts);
    //write the parsed content in file
    fs.writeFileSync(opts.output, `${parseContent}`);
    logger.info(`markdown parsed....`);
  });

//the command to open markdown preview
program
  .command("open <file>")
  .option("-t,--theme <themeName>", "the theme for markdown css", "dark")
  .description("preview markdown in the browser")
  .action(async (fileName, opts) => {
    const open = require("../lib/open");
    await open(fileName, opts.theme);
  });

//the command to watch markdown
program
  .command("watch <file>")
  .description("watch a file and output the content to a file")
  .option("-t,--theme <themeName>", "the theme to use in markdown css", "dark")
  .requiredOption("-o,--output <file>")
  .action(async (fileName, opts) => {
    const watch = require("../lib/watch");
    await watch(fileName, opts);
  });

//the command to lint markdown file
program
  .command("lint <file>")
  .description("lint markdown file")
  .action((file) => {
    spawnSync(`npx`, [`markdownlint-cli2 ${file}`], {
      shell: true,
      stdio: "inherit"
    });
  });

program.parse(process.argv);
