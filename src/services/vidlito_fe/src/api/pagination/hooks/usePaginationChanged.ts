import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export type PaginationArgsT = {
  page: number;
  pageSize: number;
};

export const usePaginationChanged = <ArgsT extends PaginationArgsT>(
  args: ArgsT
) => {
  const memo = useBuilder(() => {
    return { ...args };
  }) as ArgsT;

  // Check if queryKeyArgs is still the same
  let queryKeyArgsChanged = false;
  for (const entry in Object.entries(args)) {
    const [k, v] = entry;
    if (k === 'page' || k === 'pageSize') continue;
    if ((memo as ObjT)[k] !== v) {
      queryKeyArgsChanged = true;
    }
  }

  // Check if pagination has changed
  let paginationChanged =
    memo.page !== args.page || memo.pageSize !== args.pageSize;

  Object.assign(memo, args);
  return !queryKeyArgsChanged && paginationChanged;
};
