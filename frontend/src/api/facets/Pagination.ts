import { data, operation } from 'skandha';
import { IPagination } from '/src/api/pagination/types';

export class Pagination implements IPagination {
  static className = () => 'Pagination';

  @data requestedPage: number = 1;
  @data nrOfItems: number = 0;
  @data pageSize: number = 10;
  @data page: number = 1;

  @data get nrOfPages() {
    return Math.ceil(this.nrOfItems / this.pageSize + 1);
  }

  @data get startIdx() {
    return (this.page - 1) * this.pageSize;
  }

  @data get endIdx() {
    return Math.min(this.nrOfItems, this.startIdx + this.pageSize);
  }

  @operation setRequestedPage(page: number) {
    this.requestedPage = page;
  }
}
