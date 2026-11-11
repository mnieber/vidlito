import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { PanelState } from '/src/dashboard/DashboardState/PanelState';
import { history } from '/src/routes/history';
import { pathname } from '/src/utils/urls';

export class NavigationState {
  panelState: PanelState;

  @observable navigationPoint?: {
    url: string;
    isPlaylistExpanded: boolean;
  };

  @action storeNavigationPoint() {
    this.navigationPoint = {
      url: pathname(),
      isPlaylistExpanded: this.panelState.isPlaylistListExpanded,
    };
  }

  @action restoreNavigationPoint() {
    if (R.isNil(this.navigationPoint)) return false;
    history.push(this.navigationPoint.url);
    this.panelState.toggleIsPlaylistListExpanded(
      this.navigationPoint.isPlaylistExpanded
    );
    return true;
  }

  get hasNavigationPoint() {
    return !R.isNil(this.navigationPoint);
  }

  constructor(panelState: PanelState) {
    this.panelState = panelState;
    makeObservable(this);
  }
}
