import readDatabase from '../utils';

const databasePath = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(databasePath)
      .then((data) => {
        let message = '';
        message += 'This is the list of our students';
        for (const key of Object.keys(data)) {
          message += `\nNumber of students in ${key}: ${data[key].length}. List: ${data[key].join(', ')}`;
        }
        response.status(200).send(message);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.send(500, 'Major parameter must be CS or SWE');
    } else {
      readDatabase(databasePath)
        .then((data) => {
          const students = data[major];
          response.status(200).send(`List: ${students.join(', ')}`);
        })
        .catch(() => response.status(500).send('Cannot load the database'));
    }
  }
}

module.exports = StudentsController;
