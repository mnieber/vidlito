import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';
import { ObjT } from '/src/utils/types';

export class Search<FormT, ValueT> {
  static className = () => 'Search';

  @data isSearching: boolean = false;
  @data form?: FormT;
  @data searchResults: ValueT[] = [];

  @operation setSearchResults(searchResults: ValueT[]) {
    this.searchResults = searchResults;
  }

  @operation @withCbs() search(args: FormT): Promise<any> {
    const cbs = getCallbacks(this) as SearchCbs<FormT, ValueT>['search'];

    this.isSearching = true;
    this.form = args;
    return cbs.search().then((response: ObjT) => {
      this.setSearchResults(response.searchResults);
      this.isSearching = false;
      return response;
    });
  }
}

export type SearchCbs<FormT, ValueT> = DefineCbs<
  Search<FormT, ValueT>,
  {
    search: {
      search(): any;
    };
  }
>;
