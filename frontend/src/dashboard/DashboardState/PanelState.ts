import { action, makeObservable, observable } from 'mobx';

export class PanelState {
  @observable panelWidth: number | undefined = undefined;
  @observable isFullVideoWidth: boolean = false;
  @observable showPlaylistView: boolean = false;
  @observable isPlaylistListExpanded: boolean = false;

  @action toggleShowPlaylistView(flag?: boolean) {
    this.showPlaylistView = flag ?? !this.showPlaylistView;
  }

  @action toggleIsPlaylistListExpanded(flag?: boolean) {
    this.isPlaylistListExpanded = flag ?? !this.isPlaylistListExpanded;
    console.log('toggleIsPlaylistListExpanded', this.isPlaylistListExpanded);
  }

  @action setPanelWidth(x: number | undefined) {
    this.panelWidth = x;
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  constructor() {
    makeObservable(this);
  }
}
