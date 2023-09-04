import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { operation } from 'skandha';
import { ActionT } from '/src/api/types/ActionT';

export class Undo {
  static className = () => 'Undo';

  @operation @withCbs() undo(args: { action: ActionT }) {
    const cbs = getCallbacks(this) as UndoCbs['undo'];

    return cbs.undo();
  }
}

export type UndoCbs = DefineCbs<
  Undo,
  {
    undo: {
      undo(): any;
    };
  }
>;
