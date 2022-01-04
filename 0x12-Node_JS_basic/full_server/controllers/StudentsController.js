import readDatabase from '../utils';

const databasePath = process.argv[2];

class StudentsController {
  static getAllStudents(request, response) {
    readDatabase(databasePath)
      .then((data) => {
        const students = [];
        let message;
        students.push('This is the list of our students');

        for (const key of Object.keys(data)) {
          message = `Number of students in ${key}: ${
            data[key].length
          }. List: ${data[key].join(', ')}`;

          students.push(message);
        }
        response.send(200, `${students.join('\n')}`);
      })
      .catch(() => {
        response.send(500, 'Cannot load the database');
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

          response.send(200, `List: ${students.join(', ')}`);
        })
        .catch(() => response.send(500, 'Cannot load the database'));
    }
  }
}

export default StudentsController;
