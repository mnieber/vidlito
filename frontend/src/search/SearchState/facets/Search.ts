import { withCbs, type CallbackMap } from 'aspiration';
import { data, operation } from 'skandha';

export class Search<FormT> {
  static className = () => 'Search';

  callbackMap = {} as CallbackMap<{
    search: {
      search: () => any;
    };
  }>;

  @data form?: FormT;

  @operation search(args: FormT) {
    return withCbs(
      this.callbackMap,
      'search',
      args,
      (cbs: typeof this.callbackMap.search) => {
        cbs.search();
      }
    );
  }
}
