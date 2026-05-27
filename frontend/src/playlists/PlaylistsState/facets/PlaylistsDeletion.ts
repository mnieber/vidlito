import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { DeletionWithFlag } from '/src/clips/ClipsState/facets/DeletionWithFlag';

export class PlaylistsDeletion extends DeletionWithFlag {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected deleteItems(args: { itemIds: string[]; moveToTrash?: boolean }): any {
    return this.state.props.deletePlaylists(args.itemIds);
  }
}
