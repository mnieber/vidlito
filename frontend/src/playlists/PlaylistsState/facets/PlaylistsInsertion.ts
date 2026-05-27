import { Insertion } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class PlaylistsInsertion extends Insertion<PlaylistT> {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected performInsertion(playlists: PlaylistT[]): any {
    return this.state.props.savePlaylistOrdering(playlists);
  }
}
