const fs = require('fs');

function countStudents(path) {
  const encoding = 'utf-8';
  return new Promise((resolve, reject) => {
    let numberOfStudents = 0;
    const studentsByField = new Map();
    let header = true;

    fs.readFile(path, encoding, (error, data) => {
      let message = '';
      if (error) {
        reject(Error('Cannot load the database'));
        return;
      }
      data.split('\n').forEach((element) => {
        if (header) {
          header = false;
          return;
        }
        const student = element.split(',');
        if (student.length < 4) {
          return;
        }
        if (!(studentsByField.has(student[3]))) {
          studentsByField.set(student[3], []);
        }
        studentsByField.get(student[3]).push(student[0]);
        numberOfStudents += 1;
      });
      message += `Number of students: ${numberOfStudents}`;
      studentsByField.forEach((value, key) => {
        message += `\nNumber of students in ${key}: ${value.length}. List: ${value.join(', ')}`;
      });
      console.log(message);
      resolve(message);
    });
  });
}

module.exports = countStudents;
