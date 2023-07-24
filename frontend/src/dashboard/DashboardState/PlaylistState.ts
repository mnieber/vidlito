import { action, observable } from 'mobx';

export class PlaylistState {
  @observable showPlaylistView: boolean = false;
  @observable isPlaylistListExpanded: boolean = false;

  @action toggleShowPlaylistView(flag?: boolean) {
    this.showPlaylistView = flag ?? !this.showPlaylistView;
  }

  @action toggleIsPlaylistListExpanded(flag?: boolean) {
    this.isPlaylistListExpanded = flag ?? !this.isPlaylistListExpanded;
  }
}
