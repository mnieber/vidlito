import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { cleanUpCtr } from 'react-default-props-context';
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

  @observable showPlaylistDescription: boolean = false;
  @observable isPlaylistListExpanded: boolean = false;
  @observable navigationPoint?: string;

  @action storeNavigationPoint() {
    this.navigationPoint = pathname();
  }

  @action restoreNavigationPoint() {
    if (R.isNil(this.navigationPoint)) return false;
    history.push(this.navigationPoint);
    return true;
  }

  @action toggleShowPlaylistDescription(flag?: boolean) {
    this.showPlaylistDescription = flag ?? !this.showPlaylistDescription;
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
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    makeObservable(this);
  }
}
