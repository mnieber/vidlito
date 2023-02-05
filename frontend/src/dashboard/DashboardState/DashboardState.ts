import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { ObjT } from 'src/utils/types';

export type PropsT = {};

export class DashboardState {
  @observable anchorPoint: any;
  @observable toggleMenu: Function = () => {};
  @observable menuProps: ObjT = {};

  @observable showClips: boolean = true;
  @observable userProfile?: UserProfileT;
  @observable username?: string;
  @observable isAuthenticated: boolean = false;
  @observable videoPlayerParentElm?: any;

  @action setShowClips(showClips: boolean) {
    this.showClips = showClips;
  }

  @action setVideoPlayerParentElm(videoPlayerParentElm: any) {
    this.videoPlayerParentElm = videoPlayerParentElm;
  }

  @action openContextMenuAtPoint(anchorPoint: any) {
    this.anchorPoint = anchorPoint;
    this.toggleMenu(true);
  }

  @action closeContextMenu() {
    this.toggleMenu(false);
  }

  @action initContextMenu(toggleMenu: Function, menuProps: any) {
    this.toggleMenu = toggleMenu;
    this.menuProps = menuProps;
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
