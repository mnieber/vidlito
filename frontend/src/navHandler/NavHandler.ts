import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { matchPath } from 'react-router-dom';
import { WrapUfn } from '/src/routes/utils/RouteTable';
import { getBestRouteMatch } from '/src/routes/utils/getRouteMatches';
import { ObjT } from '/src/utils/types';
import { pathname } from '/src/utils/urls';

export class NavLayer {
  route: string;
  name: string;

  constructor(name: string, route: string) {
    this.name = name;
    this.route = route;
  }
}

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
  navLayers: Array<NavLayer> = [];
  _currentNavLayer?: NavLayer;

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

  installNavLayer(navLayer: NavLayer) {
    const existingNavLayer = R.find(
      (x: NavLayer) => x.name === navLayer.name,
      this.navLayers
    );
    if (R.isNil(existingNavLayer)) {
      this.navLayers.push(navLayer);
    }
  }

  getNavLayer(name: string) {
    return R.find((x: NavLayer) => x.name === name)(this.navLayers);
  }

  uninstallNavLayer(name: string) {
    this.navLayers = this.navLayers.filter(
      (navLayer: NavLayer) => navLayer.name !== name
    );
  }

  _getNavLayer(name: string): NavLayer | undefined {
    const sortedLayers = sortNavLayers(this.navLayers, pathname());
    for (let i = 0; i < sortedLayers.length; i++) {
      const layer = sortedLayers[i];
      const handler = (layer as ObjT)[name];
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

export function createNavHandler(props: PropsT) {
  const navHandler = new NavHandler(props);
  const proxy: NavHandler = new Proxy(navHandler, {
    get(target, prop: string) {
      if (prop in target) {
        return (target as any)[prop];
      }

      const navLayer = target._getNavLayer(prop);
      if (navLayer) {
        const f = ((navLayer as ObjT)[prop] as Function).bind(proxy);
        return (...args: any[]) => {
          const memo = target._currentNavLayer;
          target._currentNavLayer = navLayer;
          f(...args);
          target._currentNavLayer = memo;
        };
      }
      console.warn(`NavHandler: no handler for ${prop}`);
      return () => {};
    },
  });

  return proxy;
}

export function sortNavLayers(
  layers: NavLayer[],
  pathname: string
): NavLayer[] {
  type ResultT = {
    layer: NavLayer;
    match: ObjT | undefined;
  };

  let result: ResultT[] = [];
  for (const layer of layers) {
    const match =
      matchPath(pathname, {
        path: layer.route,
        strict: false,
      }) ?? undefined;
    result.push({ layer, match });
  }

  const nrMatchingParams = (match: ObjT | undefined) =>
    R.keys(match?.params ?? {}).length;

  result =
    R.sort((lhs: ResultT, rhs: ResultT) => {
      const lhsScore = nrMatchingParams(lhs.match);
      const rhsScore = nrMatchingParams(rhs.match);
      return (
        lhsScore > rhsScore || (lhsScore === rhsScore && lhs.match?.isExact)
      );
    }, result) ?? undefined;

  return R.map((result: ResultT) => result.layer, result);
}
