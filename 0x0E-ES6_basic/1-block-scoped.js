export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  const a = (a, b) => a || b;

  if (trueOrFalse) {
    const task = true;
    const task2 = false;
    a(task, task2);
  }

  return [task, task2];
}
