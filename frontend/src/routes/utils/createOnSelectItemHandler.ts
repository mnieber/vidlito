export const createOnSelectItemHandler =
  <ItemT extends { id: string }>(
    items: ItemT[],
    updateUrl?: (item: ItemT) => void
  ) =>
  (args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
  }) => {
    if (args.itemId && !(args.isCtrl || args.isShift)) {
      const ufn = _getUpdateUrlFn(items, updateUrl);
      ufn && ufn(args.itemId);
    }
  };

export const _getUpdateUrlFn = <ItemT extends { id: string }>(
  items: ItemT[],
  updateUrl?: (item: ItemT) => void
) => {
  return updateUrl
    ? (itemId: string) => {
        const item = items.find((x: ItemT) => x.id === itemId);
        item && updateUrl(item);
      }
    : undefined;
};
