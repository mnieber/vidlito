import { createBrowserHistory } from 'history';
import { action, makeObservable, observable } from 'mobx';
import { createObservableHistory } from 'mobx-observable-history';
import * as R from 'ramda';
import { sortNavLayers } from '/src/navHandler/sortNavLayers';
import { routeTable } from '/src/routes/components/RouteTableProvider';
import { WrapUfn } from '/src/routes/utils/RouteTable';
import { getBestRouteMatch } from '/src/routes/utils/getRouteMatches';
import { ObjT } from '/src/utils/types';
import { patchHistory } from '/src/utils/urls';

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

// This class returns the NavLayer for a particular prop name:
//
// 1. it selects the NavLayers that match the current route, and sorts them by the number
//    of matching url parameters.
// 2. it finds the NavLayer that contains the event handler with the given prop name.
//
// The above means that the handling of url events depends on the current url
// The component that looks up the navigation function doesn't need to know anything about the url.

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
    return getBestRouteMatch(this.routes, navigation.location.pathname);
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
    const sortedLayers = sortNavLayers(
      this.navLayers,
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
      navLayers: observable,
      installNavLayer: action,
      uninstallNavLayer: action,
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
  const navLayer = navHandler._getNavLayer(prop) as any;
  if (R.isNil(navLayer)) {
    console.error(`NavHandler: no navLayer found for ${prop}`);
  }
  return navLayer.fns[prop] as T;
};
