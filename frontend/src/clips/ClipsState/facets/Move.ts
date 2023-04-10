import { getCallbacks, host } from 'aspiration';
import { operation } from 'skandha';
import { MoveCbs } from './MoveCbs';
export type { MoveCbs } from './MoveCbs';

export class Move {
  static className = () => 'Move';

  @operation @host(['playlistId', 'copy']) move(
    playlistId: string,
    copy: boolean
  ) {
    const cbs = getCallbacks<MoveCbs['move']>(this);

    return Promise.resolve(cbs.moveItems());
  }
}
