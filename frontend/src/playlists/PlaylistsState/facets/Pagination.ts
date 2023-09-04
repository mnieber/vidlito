import { data, operation } from 'skandha';

export interface IPagination {
  nrOfPages: number;
  nrOfItems: number;
  page: number;
  pageSize: number;
  startIdx: number;
  endIdx: number;
  setPage(page: number): void;
}

export class Pagination implements IPagination {
  static className = () => 'Pagination';

  @data nrOfItems: number = 0;
  @data page: number = 1;
  @data pageSize: number = 10;

  @operation setPage(page: number) {
    this.page = page;
  }

  @data get nrOfPages() {
    return Math.ceil(this.nrOfItems / this.pageSize);
  }

  @data get startIdx() {
    return (this.page - 1) * this.pageSize;
  }

  @data get endIdx() {
    return Math.min(this.page * this.pageSize, this.nrOfItems);
  }

  @operation reset(nrOfItems: number, pageSize: number) {
    if (this.nrOfItems === nrOfItems && this.pageSize === pageSize) {
      return;
    }
    this.nrOfItems = nrOfItems;
    this.pageSize = pageSize;
    this.page = 1;
  }
}

export const resetPagination = (
  pagination: Pagination,
  sourcePagination?: IPagination
) => {
  pagination.reset(
    sourcePagination?.nrOfItems ?? 0,
    sourcePagination?.pageSize ?? 0
  );
};
