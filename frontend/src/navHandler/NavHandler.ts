import { createBrowserHistory } from 'history';
import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { sortNavLayers } from '/src/navHandler/sortNavLayers';
import { routeTable } from '/src/routes/components/RouteTableProvider';
import { WrapUfn } from '/src/routes/utils/RouteTable';
import { getBestRouteMatch } from '/src/routes/utils/getRouteMatches';
import { ObjT } from '/src/utils/types';
import { pathname } from '/src/utils/urls';

export type NavLayerT = {
  route: string;
  name: string;
  fns: ObjT;
};

export type PropsT = {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
};

// This class handles url events. A url event is any UI event that may require
// changing the url. For example, when a user selects an item in a list of employees,
// then the EmployeeListComponent may fire the userSelectedAnEmployee event, and the effect
// may be that the url changes to reflect the selected employee.
//
// When userSelectedAnEmployee is called then the NavHandler executes the following steps:
//
// 1. it selects the NavLayers that match the current route, and sorts them by the number
//    of matching url parameters.
// 2. it finds the NavLayer that contains the userSelectedAnEmployee event handler.
// 3. it executes the userSelectedAnEmployee event handler.
//
// The above means that:
// - the handling of url events is context dependent.
// - the component that fires the event does not need to know anything about the url.

export class NavHandler {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  hiddenParams: ObjT = {};
  navLayers: Array<NavLayerT> = [];

  getRouteUfns<T>() {
    return this.routeUfns as WrapUfn<T>;
  }

  updateHiddenParams() {
    this.hiddenParams = R.mergeLeft(this.hiddenParams, this.getParams());
  }

  getRouteMatch() {
    return getBestRouteMatch(this.routes, pathname());
  }

  getParams(mergeLeftWithHiddenParams = false) {
    const params = this.getRouteMatch()?.params ?? {};
    return mergeLeftWithHiddenParams
      ? R.mergeLeft(params, this.hiddenParams)
      : params;
  }

  installNavLayer(navLayer: NavLayerT) {
    const existingNavLayer = R.find(
      (x: NavLayerT) => x.name === navLayer.name,
      this.navLayers
    );
    if (R.isNil(existingNavLayer)) {
      this.navLayers.push(navLayer);
    }
  }

  getNavLayer(name: string) {
    return R.find((x: NavLayerT) => x.name === name)(this.navLayers);
  }

  uninstallNavLayer(name: string) {
    this.navLayers = this.navLayers.filter(
      (navLayer: NavLayerT) => navLayer.name !== name
    );
  }

  _getNavLayer(name: string): NavLayerT | undefined {
    const sortedLayers = sortNavLayers(this.navLayers, pathname());
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
      navLayers: observable,
      installNavLayer: action,
      uninstallNavLayer: action,
    });
  }
}

export const history = createBrowserHistory();

export const navHandler = new NavHandler({
  history: history,
  routes: routeTable.routeFnByName,
  routeUfns: routeTable.routeUfnByName,
});

export const getNavFn = <T>(prop: string, f: T): T => {
  const navLayer = navHandler._getNavLayer(prop) as any;
  if (R.isNil(navLayer)) {
    console.error(`NavHandler: no navLayer found for ${prop}`);
  }
  return navLayer.fns[prop] as T;
};
