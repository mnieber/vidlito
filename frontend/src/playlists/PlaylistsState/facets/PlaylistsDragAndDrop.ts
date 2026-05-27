import { DragAndDrop } from 'skandha-facets';
import { HoverPositionT } from 'skandha-facets/dist/facets/Hovering';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { followedSelectedPlaylistsAreInsertedOnDrop } from '/src/playlists/PlaylistsState/policies';

export class PlaylistsDragAndDrop extends DragAndDrop {
  constructor(private state: PlaylistsState) {
    super();
  }

  protected performDrop(args: { hoverPosition: HoverPositionT }): any {
    followedSelectedPlaylistsAreInsertedOnDrop(
      this,
      args.hoverPosition,
      this.state.props.getFollowedPlaylists()
    );
  }
}
