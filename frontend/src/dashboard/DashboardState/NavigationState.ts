import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { PlaylistState } from '/src/dashboard/DashboardState/PlaylistState';
import { history } from '/src/navHandler/NavHandler';
import { pathname } from '/src/utils/urls';

export class NavigationState {
  playlistState: PlaylistState;

  @observable navigationPoint?: {
    url: string;
    isPlaylistExpanded: boolean;
  };

  @action storeNavigationPoint() {
    this.navigationPoint = {
      url: pathname(),
      isPlaylistExpanded: this.playlistState.isPlaylistListExpanded,
    };
  }

  @action restoreNavigationPoint() {
    if (R.isNil(this.navigationPoint)) return false;
    history.push(this.navigationPoint.url);
    this.playlistState.toggleIsPlaylistListExpanded(
      this.navigationPoint.isPlaylistExpanded
    );
    return true;
  }

  get hasNavigationPoint() {
    return !R.isNil(this.navigationPoint);
  }

  constructor(playlistState: PlaylistState) {
    this.playlistState = playlistState;
    makeObservable(this);
  }
}
