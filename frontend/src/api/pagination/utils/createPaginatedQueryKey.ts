import { ObjT } from '/src/utils/types';

// This function creates a query key that:
// - starts with `name`
// - is followed by a version of queryArgs that omits the pagination args ('page' and 'pageSize')
// - is optionally followed by an object that only contains the pagination args
export const createPaginatedQueryKey = (
  name: string,
  queryArgs: ObjT,
  options?: { dropPaginationArgs?: boolean }
): any[] => {
  const args: ObjT = {};
  let hasArgs = false;

  const paginationArgs: ObjT = {};
  let hasPaginationArgs = false;

  for (const entry of Object.entries(queryArgs)) {
    const [k, v] = entry;
    if (k === 'page' || k === 'pageSize') {
      paginationArgs[k] = v;
      hasPaginationArgs = true;
    } else {
      args[k] = v;
      hasArgs = true;
    }
  }

  const result: any[] = [name];
  if (hasArgs || hasPaginationArgs) {
    result.push(args);
  }
  if (hasPaginationArgs && !options?.dropPaginationArgs) {
    result.push(paginationArgs);
  }
  return result;
};
