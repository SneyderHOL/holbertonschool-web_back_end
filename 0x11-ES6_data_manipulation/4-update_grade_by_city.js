export default function updateStudentGradeByCity(students, city, newGrades) {
  if (!Array.isArray(students)) {
    return [];
  }
  if (!Array.isArray(newGrades)) {
    return [];
  }
  return students.filter((student) => student.location === city)
    .map((student) => {
      const grades = newGrades.filter((newGrade) => newGrade.studentId === student.id);
      return { ...student, grade: grades.length === 0 ? 'N/A' : grades[0].grade };
    });
}
