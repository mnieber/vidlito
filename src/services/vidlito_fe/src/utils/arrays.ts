export const deleteArrayItemsInPlace = <T>(
  array: T[],
  pred: (x: T) => boolean
) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (pred(array[i])) {
      array.splice(i, 1);
    }
  }
  return array;
};
