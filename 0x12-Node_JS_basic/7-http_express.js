const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;
const database = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let displayMessage = 'This is the list of our students\n';
  countStudents(database)
    .then((message) => {
      displayMessage += message;
    })
    .catch((error) => {
      console.log(error.message);
      displayMessage += error.message;
    })
    .finally(() => res.send(displayMessage));
});

app.listen(port, () => {
  // console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
