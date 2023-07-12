import { data } from 'skandha';
import { Store } from 'skandha-facets';
import { SearchContentArgsT } from '/src/api/mutations';
import { SearchResultT } from '/src/api/types/SearchResultT';

export class SearchResultsStore extends Store<SearchResultT> {
  static className = () => 'SearchResultsStore';

  @data form?: SearchContentArgsT;
}
