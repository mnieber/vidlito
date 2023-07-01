import { data, operation } from 'skandha';

export class Pagination {
  static className = () => 'Pagination';

  @data nrOfPages: number = 0;
  @data page: number = 1;
  @data pageSize: number = 10;

  @operation setPage(page: number) {
    this.page = page;
  }
}
