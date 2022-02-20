#!/usr/bin/env node
const { program } = require("commander");
const { log } = require("console");
const { resolve } = require("path");

const { info, error, warn, debug } = require(resolve("index.js"));

const pkg = require(resolve("package.json"));
program.version(pkg.version, "-v,--version");

program
  .command("information")
  .alias("info")
  .option("-o,--out [file]", "output to a file")
  .description("info log")
  .usage("<message> [options]")
  .action((opts) => {
    var args = program.args;
    args.shift();
    if (opts.out) {
      args.pop();
      args.pop();
      info(args.join(" "), opts.out);
    } else {
      info(args.join(" "));
    }
    //info(program.args.join(" "));
  });

program
  .command("warning")
  .alias("warn")
  .description("warn log")
  .option("-o,--out [file]", "output to a file")
  .description("warn log")
  .usage("<message> [options]")
  .action((opts) => {
    var args = program.args;
    args.shift();
    if (opts.out) {
      args.pop();
      args.pop();
      warn(args.join(" "), opts.out);
    } else {
      warn(args.join(" "));
    }
  });

program
  .command("error")
  .description("error log")
  .option("-o,--out [file]", "output to a file")
  .description("warn log")
  .usage("<message> [options]")
  .action((opts) => {
    var args = program.args;
    args.shift();
    if (opts.out) {
      args.pop();
      args.pop();
      error(args.join(" "), opts.out);
    } else {
      error(args.join(" "));
    }
  });

program
  .command("debug")
  .description("debug log")
  .option("-o,--out [file]", "output to a file")
  .usage('"<debugMessage>"')
  .action((opts) => {
    var args = program.args;
    args.shift();
    if (opts.out) {
      args.pop();
      args.pop();
      debug(args.join(" "), opts.out);
    } else debug(args.join(" "));
  });

program.parse(process.argv);
