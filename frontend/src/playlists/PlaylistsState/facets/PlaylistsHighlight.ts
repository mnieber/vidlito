import { Highlight } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class PlaylistsHighlight extends Highlight<PlaylistT> {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected onSet(args: { itemId: string | undefined }): void {
    // Cancel adding a new item on highlight change
    if (this.state.playlistsCtr.addition.item && this.state.playlistsCtr.addition.item.id !== args.itemId) {
      this.state.playlistsCtr.addition.cancel();
    }
  }
}
