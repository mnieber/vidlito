import { data, operation } from 'skandha';

export interface IPagination {
  nrOfPages: number;
  nrOfItems: number;
  page: number;
  pageSize: number;
  setPage(page: number): void;
  startIdx: number;
}

export class Pagination implements IPagination {
  static className = () => 'Pagination';

  @data nrOfItems: number = 0;
  @data page: number = 1;
  @data pageSize: number = 10;

  @operation setPage(page: number) {
    this.page = page;
  }

  @data get startIdx() {
    return (this.page - 1) * this.pageSize;
  }

  @data get nrOfPages() {
    return Math.ceil(this.nrOfItems / this.pageSize);
  }
}
