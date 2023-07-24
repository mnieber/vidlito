import { action, makeObservable, observable } from 'mobx';

export class PanelState {
  @observable panelWidth: number | undefined = undefined;
  @observable isFullVideoWidth: boolean = false;

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
