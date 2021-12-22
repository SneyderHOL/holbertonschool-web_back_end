export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  if (weakMap.has(endpoint)) {
    if (weakMap.get(endpoint) >= 5) {
      throw Error('Endpoint load is high');
    }
    weakMap.set(endpoint, 1 + weakMap.get(endpoint));
  } else {
    weakMap.set(endpoint, 1);
  }
}
