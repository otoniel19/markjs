const chalk = require("chalk");
const { log } = require("console");
const { appendFileSync } = require("fs");

function getTime() {
  var time = new Date();
  var hr = time.getHours();
  var mn = time.getMinutes();
  var sc = time.getSeconds();
  var format = "AM";
  if (hr > 12) format = "PM";
  else format = "AM";
  return `[${chalk.grey(`${hr}:${mn}:${sc} ${format}`)}]`;
}

function info(message = "", outFile = "") {
  var infoData = `${getTime()}[${chalk.blue("info")}] ${message}`;
  if (outFile) appendFileSync(outFile, infoData + "\n");
  log(infoData);
}

function warn(message = "", outFile = "") {
  var warningData = `${getTime()}[${chalk.yellow("warning")}] ${message}`;
  if (outFile) appendFileSync(outFile, warningData + "\n");
  log(warningData);
}

function error(message = "", outFile = "") {
  var errorData = `${getTime()}[${chalk.red("error")}] ${message}`;
  if (outFile) appendFileSync(outFile, errorData + "\n");
  log(errorData);
}

function debug(debugMessage, outFile = "") {
  var debugData = ``;
  try {
    debugData = `${getTime()}[${chalk.blue("debug")}] ${JSON.parse(
      JSON.stringify(debugMessage)
    )}`;
  } catch (e) {
    debugMessage = `${getTime()}[${chalk.blue("debug")}] ${debugMessage}`;
  }
  log(debugData);
  if (outFile) appendFileSync(outFile, debugData + "\n", "utf-8");
}

module.exports = { info, warn, error, debug };
