import { data, output } from 'skandha';
import { Store } from 'skandha-facets';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { listToItemById } from '/src/utils/ids';

export class PlaylistsStore extends Store<PlaylistT> {
  static className = () => 'PlaylistsStore';

  @data unfollowedPlaylist?: PlaylistT;

  @output get outputItems(): PlaylistT[] {
    return [
      ...(this.unfollowedPlaylist ? [this.unfollowedPlaylist] : []),
      ...(this.items ?? []),
    ];
  }

  @output get outputItemById(): { [id: string]: PlaylistT } {
    return listToItemById(this.outputItems ?? []);
  }
}
