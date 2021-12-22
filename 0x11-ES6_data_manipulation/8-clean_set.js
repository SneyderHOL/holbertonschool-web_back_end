export default function cleanSet(set, startString) {
  if (!(set instanceof Set) || set.size === 0 || typeof (startString) !== 'string' || startString === '') {
    return '';
  }
  return Array.from(set)
    .filter((element) => typeof element === 'string' && element.startsWith(startString))
    .map((element) => element.slice(startString.length))
    .join('-');
}
