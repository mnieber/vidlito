import * as R from 'ramda';
import { ObjT } from '/src/utils/types';

export type PaginationT = {
  nrOfItems: number;
  pageSize: number;
  page: number;
};

export type IPagination = PaginationT & {
  startIdx: number;
  endIdx: number;
  requestedPage: number;
  nrOfPages: number;
  setRequestedPage(page: number): void;
};

export const omitPaginationArgs = (args: ObjT) => {
  return R.omit(['page', 'pageSize'], args);
};

export type OmitPaginationArgs<T> = Omit<T, 'page' | 'pageSize'>;
