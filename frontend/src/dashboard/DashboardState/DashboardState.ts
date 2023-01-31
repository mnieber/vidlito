import { action, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';

export type PropsT = {};

export class DashboardState {
  @observable showClips: boolean = false;

  @action setShowClips(showClips: boolean) {
    this.showClips = showClips;
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
