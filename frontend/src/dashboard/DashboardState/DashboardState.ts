import { makeObservable, observable } from 'mobx';
import * as Skandha from 'skandha';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { cookiesState } from '/src/dashboard/DashboardState/CookiesState';
import { NavigationState } from '/src/dashboard/DashboardState/NavigationState';
import { PanelState } from '/src/dashboard/DashboardState/PanelState';
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
  cookiesState = cookiesState;
  panelState = new PanelState();
  navigationState = new NavigationState(this.panelState);

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
