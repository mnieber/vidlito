import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { ObjT } from 'src/utils/types';

type ContextMenuT = {
  anchorPoint: any;
  toggleMenu: Function;
  menuProps: ObjT;
};

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
  @observable contextMenu: ContextMenuT = {
    anchorPoint: undefined,
    toggleMenu: () => {
      console.log('toggleMenu not initialized');
    },
    menuProps: {},
  };

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

  @action toggleShowPlaylistDescription(flag?: boolean) {
    this.showPlaylistDescription = flag ?? !this.showPlaylistDescription;
  }

  @action toggleIsPlaylistListExpanded(flag?: boolean) {
    this.isPlaylistListExpanded = flag ?? !this.isPlaylistListExpanded;
  }

  @action setVideoPlayerParentElm(videoPlayerParentElm: any) {
    this.video.videoPlayerParentElm = videoPlayerParentElm;
  }

  @action setIsPlaylistListExpanded(flag: boolean) {
    this.isPlaylistListExpanded = flag;
  }

  @action openContextMenuAtPoint(anchorPoint: any) {
    this.contextMenu.anchorPoint = anchorPoint;
    this.contextMenu.toggleMenu(true);
  }

  @action closeContextMenu() {
    this.contextMenu.toggleMenu(false);
  }

  @action initContextMenu(toggleMenu: Function, menuProps: any) {
    this.contextMenu.toggleMenu = toggleMenu;
    this.contextMenu.menuProps = menuProps;
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
