const encoding = 'utf-8';
console.log('Welcome to Holberton School, what is your name?');
process.stdin.on('readable', () => {
  const input = process.stdin.read();
  process.stdout.write(`Your name is: ${input}`);
});

process.stdin.on('end', function () {
  console.log('This important software is now closing');
});