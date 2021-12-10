export default function appendToEachArrayValue(array, appendString) {
  const auxArray = array;
  for (const element of array) {
    const index = array.indexOf(element);
    auxArray[index] = appendString + element;
  }

  return auxArray;
}
