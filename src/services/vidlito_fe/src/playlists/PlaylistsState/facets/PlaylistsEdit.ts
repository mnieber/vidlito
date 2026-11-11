import { Edit } from 'skandha-facets';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { ObjT } from '/src/utils/types';

export class PlaylistsEdit extends Edit {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected saveItem(args: { values: any }): any {
    return this.state.props.savePlaylist(args.values).then((response: ObjT) => {
      this.state.playlistsCtr.addition.confirm();
      return response;
    });
  }

  protected onCancel(): void {
    this.state.playlistsCtr.addition.cancel();
  }
}
