export default function iterateThroughObject(reportWithIterator) {
  const employees = [];
  for (const key of reportWithIterator) {
    employees.push(key);
  }

  return employees.join(' | ');
}
