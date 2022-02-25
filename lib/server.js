const express = require("express");
const open = require("open");
const app = express();
var htmlContent = "";

const log = require("./utils").logger();

app.get("/", (req, res) => {
  res.send(htmlContent);
});

var server = app.listen(5000, () => {
  log.info(`markdown preview server listening at http://localhost:5000/`);
  //open url in the browser
  open("http://localhost:5000/");
});

const restartServer = () => {
  server.close();
  server = app.listen(5000, () => {
    log.info(`markdown preview server listening at http://localhost:5000/`);
  });
};

const ToSend = (str) => (htmlContent = str);

module.exports = { restartServer, ToSend };
