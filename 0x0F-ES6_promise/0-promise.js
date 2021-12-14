export default function getResponseFromAPI() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });
}
