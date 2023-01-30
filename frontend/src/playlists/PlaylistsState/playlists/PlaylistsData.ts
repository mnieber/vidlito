import { data, input, output } from 'skandha';
import { PlaylistByIdT, PlaylistT } from 'src/api/types/PlaylistT';
import { listToItemById } from 'src/utils/ids';

export class PlaylistsData {
  static className = () => 'PlaylistsData';

  @input playlists: Array<PlaylistT> = [];
  @data previousPlaylist?: PlaylistT;

  @output get playlistById(): PlaylistByIdT {
    return listToItemById(this.playlists);
  }
}
