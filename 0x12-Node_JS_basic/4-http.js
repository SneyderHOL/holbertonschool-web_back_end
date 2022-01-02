const http = require('http');

const port = 1245;

const requestListener = (req, res) => {
  res.writeHead(200);
  res.end('Hello Holberton School!');
};

const app = http.createServer(requestListener).listen(port);

module.exports = app;
