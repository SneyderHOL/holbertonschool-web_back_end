const fs = require('fs');

function countStudents(path) {
  const encoding = 'utf-8';
  let numberOfStudents = 0;
  const studentsByField = new Map();
  let header = true;
  let data = null;
  try {
    data = fs.readFileSync(path, encoding);
  } catch (error) {
    throw Error('Cannot load the database');
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
  console.log(`Number of students: ${numberOfStudents}`);
  studentsByField.forEach(
    (value, key) => console.log(
      `Number of students in ${key}: ${value.length}. List: ${value.join(', ')}`,
    ),
  );
}

module.exports = countStudents;
