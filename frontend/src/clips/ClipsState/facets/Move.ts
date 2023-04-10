import { operation } from 'skandha';
import { Cbs, getCallbacks, host } from 'skandha-facets';

export class Move {
  static className = () => 'Move';

  @operation @host() move(args: {
    //
    playlistId: string;
    copy: boolean;
  }) {
    const cbs = getCallbacks(this) as MoveCbs['move'];

    return Promise.resolve(cbs.moveItems());
  }
}

export type MoveCbs = {
  move: Cbs<Move['move']> & {
    moveItems(): any;
  };
};
