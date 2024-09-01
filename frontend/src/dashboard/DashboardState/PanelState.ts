import { action, computed, makeObservable, observable } from 'mobx';

export class PanelState {
  @observable accessor panelWidth: number | undefined = undefined;
  @observable accessor screenWidth: number = window.innerWidth;
  @observable accessor isFullVideoWidth: boolean = false;
  @observable accessor isResizing: boolean = false;
  @observable accessor showPlaylistView: boolean = false;
  @observable accessor isPlaylistListExpanded: boolean = false;
  @observable accessor _isSidebarOpen: boolean = false;

  @computed get maxVideoWidth() {
    return this.screenWidth < 1000 || this.isFullVideoWidth ? 1200 : 800;
  }

  @action toggleShowPlaylistView(flag?: boolean) {
    this.showPlaylistView = flag ?? !this.showPlaylistView;
  }

  @action toggleIsPlaylistListExpanded(flag?: boolean) {
    this.isPlaylistListExpanded = flag ?? !this.isPlaylistListExpanded;
  }

  @action setPanelWidth(screenWidth: number, panelWidth: number) {
    this.screenWidth = screenWidth;
    this.panelWidth = panelWidth;
    if (screenWidth > 1000) {
      this.setIsSidebarOpen(false);
    }
  }

  @action setIsResizing(isResizing: boolean) {
    this.isResizing = isResizing;
  }

  @action setIsSidebarOpen(isSidebarOpen: boolean) {
    this._isSidebarOpen = isSidebarOpen;
  }

  @computed get isSidebarOpen() {
    return this._isSidebarOpen; //  && this.screenWidth < 1000
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  constructor() {
    makeObservable(this);
  }
}
