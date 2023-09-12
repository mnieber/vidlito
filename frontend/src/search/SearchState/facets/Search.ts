import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { data, operation } from 'skandha';

export class Search<FormT> {
  static className = () => 'Search';

  @data form?: FormT;

  @operation @withCbs() search(args: FormT) {
    const cbs = getCallbacks(this) as SearchCbs<FormT>['search'];
    cbs.search();
  }
}

export type SearchCbs<FormT> = DefineCbs<
  Search<FormT>,
  {
    search: {
      search(): any;
    };
  }
>;
