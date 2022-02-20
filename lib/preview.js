const logger = require("@otoniel19/logger");
const app = require("express")();

var html = "";

app.get("/", (req, res) => {
  res.send(html);
});

var server = app.listen(5000, () => {
  logger.info("server listening on port 5000");
  require("open")("http://localhost:5000");
});

exports.c = (c) => (html = c);
exports.restartServer = () => {
  server.close();
  server = app.listen(5000, () => {
    logger.info("server listening on port 5000");
    require("open")("http://localhost:5000");
  });
};
