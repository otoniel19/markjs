const parser = require("./parser");
const server = require("./server");
const utils = require("./utils");
const log = utils.logger();
const fs = require("fs");

const { spawnSync } = require("child_process");
spawnSync("clear", ["-x"], { stdio: "inherit", shell: true });

//get markdown content
async function getMd(theme, fileName) {
  const parsedMarkdown = await parser(fileName, {
    theme: theme,
    output: fileName
  });
  return parsedMarkdown;
}

var watchOpts = {
  interval: 0,
  persistent: true
};

module.exports = async function (fileName, theme) {
  //parse the markdown
  utils.clear();
  log.info("starting markdown preview...");
  //default content to send
  server.ToSend(await getMd(theme, fileName));
  fs.watchFile(fileName, watchOpts, async (c, p) => {
    //clear console
    utils.clear();
    log.info(`${fileName} changed starting preview server....`);
    //default content to send
    server.ToSend(await getMd(theme, fileName));
    //restart the server
    server.restartServer();
  });
};
