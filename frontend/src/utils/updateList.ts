import * as R from 'ramda';

// Insert newItem after the item with parentId in items.
// If newItem is already in the list, replace it.
export const updateList = (
  items: any[],
  parentId: string | undefined,
  newItem: any
) => {
  let insertPos = undefined;
  let idx = 0;
  for (const item of items) {
    if (item.id === newItem.id) {
      return R.update(idx, newItem, items);
    }
    if (item.id === parentId) {
      insertPos = idx + 1;
      break;
    }
    idx += 1;
  }
  return R.insert(insertPos ?? items.length, newItem, items);
};
