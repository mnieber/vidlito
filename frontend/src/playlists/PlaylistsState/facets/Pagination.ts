import { data, operation } from 'skandha';

export class Pagination {
  static className = () => 'Pagination';

  @data nrOfPages: number = 0;
  @data page: number = 0;
  @data pageSize: number = 0;

  @operation setPage(page: number) {
    this.page = page;
  }
}
