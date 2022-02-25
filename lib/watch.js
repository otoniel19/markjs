const parser = require("./parser");
const utils = require("./utils");
const { writeFileSync, watchFile, existsSync } = require("fs");
const log = utils.logger();

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
  if (!existsSync(fileName)) log.faltalError(`file ${fileName} dont exists`);

  log.info("initializing...");

  const mdContent_1 = await getMd(fileName, theme, output);
  writeFileSync(output, `${mdContent_1}`);
  log.info(`writed to ${output}`);
  //watch the file for changes
  watchFile(fileName, watchOpts, async (c, p) => {
    //clear console
    utils.clear();
    log.info(`${fileName} changed starting...`);
    //write to file
    writeFileSync(output, `${await getMd(fileName, theme, output)}`);
    log.info(`writed to ${output}`);
  });
};
