import { Selection, handleSelectItem } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

export class PlaylistsSelection extends Selection<PlaylistT> {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected performSelection(args: {
    itemId: string | undefined;
    isShift?: boolean;
    isCtrl?: boolean;
    context?: any;
  }): void {
    handleSelectItem(this, args);
    // Note that highlight does not follow selection, because we want to
    // highlight with the arrow icon in the playlist list-item.
  }
}
