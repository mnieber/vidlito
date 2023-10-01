import { withCbs, type DefineCbs } from 'aspiration';
import { operation } from 'skandha';
import { ActionT } from '/src/api/types/ActionT';

export class Undo {
  static className = () => 'Undo';

  callbackMap = {} as DefineCbs<{
    undo: {
      undo: () => any;
    };
  }>;

  @operation undo(args: { action: ActionT }) {
    return withCbs(
      this.callbackMap,
      'undo',
      args,
      (cbs: typeof this.callbackMap.undo) => {
        return cbs.undo();
      }
    );
  }
}
