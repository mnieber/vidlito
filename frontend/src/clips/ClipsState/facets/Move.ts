import { CallbackMap, withCbs } from 'aspiration';
import { operation } from 'skandha';

export class Move {
  static className = () => 'Move';

  callbackMap = {} as CallbackMap<{
    move: {
      moveItems: () => any;
    };
  }>;

  @operation move(args: {
    //
    playlistId: string;
    copy: boolean;
  }) {
    return withCbs(
      this.callbackMap,
      'move',
      args,
      (cbs: typeof this.callbackMap.move) => {
        return Promise.resolve(cbs.moveItems());
      }
    );
  }
}
