import { action, computed, makeObservable, observable } from 'mobx';
import type { IPagination } from '/src/playlists/PlaylistsState/facets/Pagination';

// This class is used to adapt a pagination to a new page size.
// It assumes that the new page size is a divisor of the old page size.
// The startIdx of the new pagination is relative to the startIdx of the old
// pagination.
export class PaginationAdapter implements IPagination {
  @observable pagination: IPagination;
  @observable pageSize: number;
  @observable page: number;

  @computed get nrOfItems() {
    return this.pagination.nrOfItems;
  }

  @computed get nrOfPages() {
    return Math.ceil(this.pagination.nrOfItems / this.pageSize);
  }

  @action setPage(page: number) {
    this.page = page;
    this.pagination.setPage(
      Math.ceil((page * this.pageSize) / this.pagination.pageSize)
    );
  }

  constructor(pagination: IPagination, pageSize: number) {
    this.pagination = pagination;
    this.pageSize = pageSize;
    this.page = 1;
    makeObservable(this);

    // If this.pagination.pageSize / pageSize is not an integer, then
    // throw an error.
    if (this.pagination.pageSize % pageSize !== 0) {
      throw new Error(
        `PaginationAdapter: pageSize ${pageSize} is not a ` +
          `divisor of ${this.pagination.pageSize}`
      );
    }
  }
}

export function getDisplayPage(
  loadedPagination: IPagination,
  displayPagination: IPagination,
  loadedItems: any
) {
  const start =
    (displayPagination.page - 1) * displayPagination.pageSize -
    (loadedPagination.page - 1) * loadedPagination.pageSize;
  const end = Math.min(loadedItems.length, start + displayPagination.pageSize);
  return loadedItems.slice(start, end);
}
