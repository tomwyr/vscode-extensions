export function distinct<T>(item: T, index: number, array: T[]) {
  return array.indexOf(item) == index
}

export function notEmpty(item: string, _index: number, _array: string[]) {
  return item.length > 0
}

export function getLastIndexWhere<T>(
  array: T[],
  predicate: (item: T) => boolean,
): number {
  let lastNonEmptyIndex = -1

  for (let index = array.length - 1; index >= 0; index--) {
    if (predicate(array[index])) {
      lastNonEmptyIndex = index
      break
    }
  }

  return lastNonEmptyIndex
}
