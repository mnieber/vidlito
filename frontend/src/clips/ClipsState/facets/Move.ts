import { DefineCbs, getCallbacks, withCbs } from 'aspiration';
import { operation } from 'skandha';

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

export type MoveCbs = DefineCbs<
  Move,
  {
    move: {
      moveItems(): any;
    };
  }
>;
