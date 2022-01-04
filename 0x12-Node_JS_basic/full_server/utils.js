const fs = require('fs');

function readDatabase(filePath) {
  const encoding = 'utf-8';
  return new Promise((resolve, reject) => {
    const studentsByField = {};
    fs.readFile(filePath, encoding, (error, data) => {
      let header = true;
      if (error) {
        reject(error);
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
        if (!(studentsByField[student[3]])) {
          studentsByField[student[3]] = [];
        }
        studentsByField[student[3]].push(student[0]);
      });
      resolve(studentsByField);
    });
  });
}

export default readDatabase;
