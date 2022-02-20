const logger = require("@otoniel19/logger");
const app = require("express")();

var html = "";

app.get("/", (req, res) => {
  res.send(html);
});

app.listen(5000, () => {
  logger.info("server listening on port 5000");
  require("open")("http://localhost:5000");
});

module.exports = (c) => (html = c);
