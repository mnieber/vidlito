import { action, makeObservable, observable } from 'mobx';

export class Settings {
  @observable showAllActions: boolean = false;

  @action setShowAllActions = (showAllActions: boolean) => {
    this.showAllActions = showAllActions;
  };

  constructor() {
    makeObservable(this);
  }
}
