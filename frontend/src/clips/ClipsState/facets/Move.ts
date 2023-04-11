import { operation } from 'skandha';
import { DefineCbs, getCallbacks, withCbs } from 'skandha-facets';

export class Move {
  static className = () => 'Move';

  @operation @withCbs() move(args: {
    //
    playlistId: string;
    copy: boolean;
  }) {
    const cbs = getCallbacks(this) as MoveCbs['move'];

    return Promise.resolve(cbs.moveItems());
  }
}

type Cbs = {
  move: {
    moveItems(): any;
  };
};

export type MoveCbs = DefineCbs<Move, Cbs>;
