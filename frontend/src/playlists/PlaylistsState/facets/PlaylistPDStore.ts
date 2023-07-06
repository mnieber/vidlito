import { data, operation } from 'skandha';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';

export class PlaylistPDStore {
  static className = () => 'PlaylistPDStore';

  @data playlistPD?: PlaylistPDT;

  @operation setPlaylistPD(playlistPD: PlaylistPDT) {
    this.playlistPD = playlistPD;
  }
}
