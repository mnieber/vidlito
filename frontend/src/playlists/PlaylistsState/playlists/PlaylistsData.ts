import { data, input, operation, output } from 'skandha';
import { PlaylistByIdT, PlaylistT } from 'src/api/types/PlaylistT';
import { listToItemById } from 'src/utils/ids';

export class PlaylistsData {
  static className = () => 'PlaylistsData';

  @input playlists: Array<PlaylistT> = [];
  @output playlistsDisplay: Array<PlaylistT> = [];
  @data playlistSlug?: string;

  @output get playlistById(): PlaylistByIdT {
    return listToItemById(this.playlistsDisplay);
  }

  @operation setPlaylistSlug(playlistSlug: string) {
    this.playlistSlug = playlistSlug;
  }
}
