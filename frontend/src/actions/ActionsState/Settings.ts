import { action, makeObservable, observable } from 'mobx';
import { IPagination } from '/src/api/pagination/types';

export type PropsT = {
  actionsPagination: IPagination;
};

export class Settings {
  @observable accessor showAllActions = false;
  @observable accessor actionsPagination: IPagination;

  @action setShowAllActions = (showAllActions: boolean) => {
    if (this.showAllActions != showAllActions) {
      this.actionsPagination.setRequestedPage(1);
      this.showAllActions = showAllActions;
    }
  };

  constructor(props: PropsT) {
    this.actionsPagination = props.actionsPagination;
    makeObservable(this);
  }
}
