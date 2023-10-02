import { CallbackMap, withCbs } from 'aspiration';
import { data, operation, stub } from 'skandha';
import { PlaylistT } from '/src/api/types/PlaylistT';

export class Following {
  static className = () => 'Following';

  callbackMap = {} as CallbackMap<{
    followPlaylist: {
      followPlaylist: () => any;
    };
  }>;

  @data playlist?: PlaylistT;
  @data isFollowing: boolean = stub;

  @operation followPlaylist(args: { flag: boolean }) {
    return withCbs(
      this.callbackMap,
      'followPlaylist',
      args,
      (cbs: typeof this.callbackMap.followPlaylist) => {
        return Promise.resolve(cbs.followPlaylist());
      }
    );
  }
}
