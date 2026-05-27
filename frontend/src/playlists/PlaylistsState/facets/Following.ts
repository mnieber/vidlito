import { data, operation, stub } from 'skandha';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class Following {
  static className = () => 'Following';

  @data playlist?: PlaylistT;
  @data isFollowing: boolean = stub;

  constructor(private state: PlaylistsState) {}

  @operation followPlaylist(args: { flag: boolean }) {
    return Promise.resolve(
      this.state.props.followPlaylist(this.playlist!, args.flag)
    );
  }
}
