export default function getStudentIdsSum(students) {
  if (!Array.isArray(students)) {
    return [];
  }
  return students.map((student) => student.id)
    .reduce((previousValue, currentValue) => previousValue + currentValue);
}
