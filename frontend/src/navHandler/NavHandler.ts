import { createBrowserHistory } from 'history';
import { action, makeObservable, observable } from 'mobx';
import { createObservableHistory } from 'mobx-observable-history';
import * as R from 'ramda';
import { sortNavPages } from '/src/navHandler/sortNavPages';
import { routeTable } from '/src/routes/components/RouteTableProvider';
import { WrapUfn } from '/src/routes/utils/RouteTable';
import { getBestRouteMatch } from '/src/routes/utils/getRouteMatches';
import { ObjT } from '/src/utils/types';
import { patchHistory } from '/src/utils/urls';

export type NavPageT = {
  route: string;
  name: string;
  fns: ObjT;
};

export type PropsT = {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
};

// This class returns the NavPage for a particular prop name:
//
// 1. it selects the NavPages that match the current route, and sorts them by the number
//    of matching url parameters.
// 2. it finds the NavPage that contains the event handler with the given prop name.
//
// The above means that the handling of url events depends on the current url
// The component that looks up the navigation function doesn't need to know anything about the url.

export class NavHandler {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  navPages: Array<NavPageT> = [];

  getRouteUfns<T>() {
    return this.routeUfns as WrapUfn<T>;
  }

  getRouteMatch() {
    return getBestRouteMatch(this.routes, navigation.location.pathname);
  }

  getParams() {
    return this.getRouteMatch()?.params ?? {};
  }

  installNavPage(navPage: NavPageT) {
    const existingNavPage = R.find(
      (x: NavPageT) => x.name === navPage.name,
      this.navPages
    );
    if (R.isNil(existingNavPage)) {
      this.navPages.push(navPage);
    }
  }

  getNavPage(name: string) {
    return R.find((x: NavPageT) => x.name === name)(this.navPages);
  }

  uninstallNavPage(name: string) {
    this.navPages = this.navPages.filter(
      (navPage: NavPageT) => navPage.name !== name
    );
  }

  _getNavPage(name: string): NavPageT | undefined {
    const sortedLayers = sortNavPages(
      this.navPages,
      navigation.location.pathname
    );
    for (let i = 0; i < sortedLayers.length; i++) {
      const layer = sortedLayers[i];
      const handler = layer.fns[name];
      if (handler) {
        return layer;
      }
    }
    return undefined;
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;

    makeObservable(this, {
      navPages: observable,
      installNavPage: action,
      uninstallNavPage: action,
    });
  }
}

export const history = patchHistory(createBrowserHistory());
export const navigation = createObservableHistory(history);

export const navHandler = new NavHandler({
  history: history,
  routes: routeTable.routeFnByName,
  routeUfns: routeTable.routeUfnByName,
});

export const getNavFn = <T>(prop: string, f: T): T => {
  const navPage = navHandler._getNavPage(prop) as any;
  if (R.isNil(navPage)) {
    console.error(`NavHandler: no navPage found for ${prop}`);
  }
  return navPage.fns[prop] as T;
};
