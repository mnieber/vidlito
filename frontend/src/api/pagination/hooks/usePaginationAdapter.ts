import { PaginationAdapter } from '/src/api/pagination/PaginationAdapter';
import { IPagination } from '/src/api/pagination/types';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const usePaginationAdapter = (
  pagination: IPagination,
  pageSize: number
) => {
  return useBuilder(() => {
    return new PaginationAdapter(pagination, pageSize);
  });
};
