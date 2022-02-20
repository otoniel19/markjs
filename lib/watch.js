const parser = require("./parser");
const utils = require("./utils");
const { writeFileSync, watchFile } = require("fs");
const { info } = require("@otoniel19/logger");

const getMd = (fileName, theme, out) => {
  return parser(fileName, {
    theme: theme,
    output: out
  });
};

var watchOpts = {
  interval: 0,
  persistent: true
};

module.exports = async function (fileName, { theme, output }) {
  info("initializing...");
  const mdContent_1 = await getMd(fileName, theme, output);
  writeFileSync(output, `${mdContent_1}`);
  info(`writed to ${output}`);
  watchFile(fileName, watchOpts, async (c, p) => {
    utils.clear();
    info(`${fileName} changed starting...`);
    writeFileSync(output, `${await getMd(fileName, theme, output)}`);
    info(`writed to ${output}`);
  });
};
