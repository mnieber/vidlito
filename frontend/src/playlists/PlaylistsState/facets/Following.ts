import { DefineCbs, getCallbacks, stub, withCbs } from 'aspiration';
import { data, operation } from 'skandha';
import { PlaylistT } from '/src/api/types/PlaylistT';

export class Following {
  static className = () => 'Following';

  @data playlist?: PlaylistT;
  @data isFollowing: boolean = stub;

  @operation @withCbs() followPlaylist(args: { flag: boolean }) {
    const cbs = getCallbacks(this) as FollowingCbs['followPlaylist'];

    return Promise.resolve(cbs.followPlaylist());
  }
}

export type Cbs = {
  followPlaylist: {
    followPlaylist(): any;
  };
};

export type FollowingCbs = DefineCbs<Following, Cbs>;
