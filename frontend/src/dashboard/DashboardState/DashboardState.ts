import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { UserProfileT } from 'src/api/types/UserProfileT';

export type PropsT = {};

export class DashboardState {
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
