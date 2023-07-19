import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import * as Skandha from 'skandha';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { createContextMenu } from '/src/frames/utils/createContextMenu';
import { history } from '/src/navHandler/NavHandler';
import { pathname } from '/src/utils/urls';

type AccountT = {
  userProfile?: UserProfileT;
  username?: string;
  isAuthenticated: boolean;
};

type VideoT = {
  videoPlayerParentElm?: any;
};

export type PropsT = {};

export class DashboardState {
  clipListContextMenu = createContextMenu();
  accountMenu = createContextMenu();
  @observable panelWidth: number | undefined = undefined;
  @observable isFullVideoWidth: boolean = false;

  @observable account: AccountT = {
    userProfile: undefined,
    username: undefined,
    isAuthenticated: false,
  };

  @observable video: VideoT = {
    videoPlayerParentElm: undefined,
  };

  @observable showPlaylistView: boolean = false;
  @observable isPlaylistListExpanded: boolean = false;
  @observable navigationPoint?: {
    url: string;
    isPlaylistExpanded: boolean;
  };

  @action setPanelWidth(x: number | undefined) {
    this.panelWidth = x;
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  @action storeNavigationPoint() {
    this.navigationPoint = {
      url: pathname(),
      isPlaylistExpanded: this.isPlaylistListExpanded,
    };
  }

  get hasNavigationPoint() {
    return !R.isNil(this.navigationPoint);
  }

  @action restoreNavigationPoint() {
    if (R.isNil(this.navigationPoint)) return false;
    history.push(this.navigationPoint.url);
    this.toggleIsPlaylistListExpanded(this.navigationPoint.isPlaylistExpanded);
    return true;
  }

  @action toggleShowPlaylistView(flag?: boolean) {
    this.showPlaylistView = flag ?? !this.showPlaylistView;
  }

  @action toggleIsPlaylistListExpanded(flag?: boolean) {
    this.isPlaylistListExpanded = flag ?? !this.isPlaylistListExpanded;
  }

  @action setVideoPlayerParentElm(videoPlayerParentElm: any) {
    this.video.videoPlayerParentElm = videoPlayerParentElm;
  }

  getSummary() {
    return {};
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    makeObservable(this);
  }
}
