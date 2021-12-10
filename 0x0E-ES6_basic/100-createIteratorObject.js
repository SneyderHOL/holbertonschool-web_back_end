export default function createIteratorObject(report) {
  const employees = [];
  for (const key of Object.keys(report.allEmployees)) {
    employees.push(...report.allEmployees[key]);
  }
  return employees;
}
