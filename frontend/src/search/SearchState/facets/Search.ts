import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';
import { SearchResultT } from '/src/api/types/SearchResultT';
import { ObjT } from '/src/utils/types';

export class Search {
  static className = () => 'Search';

  @data isSearching: boolean = false;
  @data form?: {
    playlistTerms: string;
    clipTerms: string;
  };
  @data searchResults: SearchResultT[] = [];

  @operation setSearchResults(searchResults: SearchResultT[]) {
    this.searchResults = searchResults;
  }

  @operation @withCbs() search(args: {
    playlistTerms: string;
    clipTerms: string;
  }): Promise<any> {
    const cbs = getCallbacks(this) as SearchCbs['search'];

    this.isSearching = true;
    this.form = {
      playlistTerms: args.playlistTerms,
      clipTerms: args.clipTerms,
    };
    return cbs.search().then((response: ObjT) => {
      this.setSearchResults(response.searchResults);
      this.isSearching = false;
      return response;
    });
  }
}

export type SearchCbs = DefineCbs<
  Search,
  {
    search: {
      search(): any;
    };
  }
>;
