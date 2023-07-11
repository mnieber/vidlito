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

  @action storeNavigationPoint() {
    this.navigationPoint = {
      url: pathname(),
      isPlaylistExpanded: this.isPlaylistListExpanded,
    };
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
