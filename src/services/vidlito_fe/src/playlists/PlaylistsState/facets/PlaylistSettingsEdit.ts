import { Edit } from 'skandha-facets';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class PlaylistSettingsEdit extends Edit {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected saveItem(args: { values: any }): any {
    return this.state.props.savePlaylistSettings(args.values);
  }
}
