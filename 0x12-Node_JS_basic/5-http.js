const http = require('http');
const countStudents = require('./3-read_file_async');

const port = 1245;
const database = process.argv[2];

const requestListener = async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.writeHead(200);
  // res.end('Hello Holberton School!');
  switch (req.url) {
    case '/':
      res.end('Hello Holberton School!');
      break;
    case '/students':
      res.write('This is the list of our students\n');
      countStudents(database)
        .then((message) => {
          res.end(message);
        })
        .catch((error) => {
          console.log(error.message);
          res.end(error.message);
        });
      break;
    default:
      res.writeHead(404);
      res.end('Resource not found');
  }
};

const app = http.createServer(requestListener).listen(port);

module.exports = app;
