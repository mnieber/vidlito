import { makeObservable, observable } from 'mobx';
import * as Skandha from 'skandha';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { CookiesState } from '/src/dashboard/DashboardState/CookiesState';
import { NavigationState } from '/src/dashboard/DashboardState/NavigationState';
import { PanelState } from '/src/dashboard/DashboardState/PanelState';
import { PlaylistState } from '/src/dashboard/DashboardState/PlaylistState';
import { createContextMenu } from '/src/frames/utils/createContextMenu';

type AccountT = {
  userProfile?: UserProfileT;
  username?: string;
  isAuthenticated: boolean;
};

export type PropsT = {};

export class DashboardState {
  accountMenu = createContextMenu();
  clipListContextMenu = createContextMenu();
  cookiesState = new CookiesState();
  playlistState = new PlaylistState();
  navigationState = new NavigationState(this.playlistState);
  panelState = new PanelState();

  @observable account: AccountT = {
    userProfile: undefined,
    username: undefined,
    isAuthenticated: false,
  };

  getSummary() {
    return {};
  }

  destroy() {
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    makeObservable(this);
  }
}
