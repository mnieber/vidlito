import * as R from 'ramda';

// If newItem is already in the list, replace it.
// Otherwise, insert newItem after the item with parentId,
// or at the end of the list if parentId is not found.
export const addOrReplaceListItem = (
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
