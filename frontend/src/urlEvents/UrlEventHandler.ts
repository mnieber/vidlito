import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { matchPath } from 'react-router-dom';
import { getBestRouteMatch } from 'src/routes/utils/getRouteMatches';
import { ObjT } from 'src/utils/types';
import { pathname } from 'src/utils/urls';

export class UrlEventLayer {
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

export type CreateEventLayerFunctionT = (
  name: string,
  route: string
) => UrlEventLayer;

// This class handles url events. A url event is any UI event that may require
// changing the url. For example, when a user selects an item in a list of employees,
// then the EmployeeListComponent may fire the userSelectedAnEmployee event, and the effect
// may be that the url changes to reflect the selected employee.
//
// When userSelectedAnEmployee is called then the UrlEventHandler executes the following steps:
//
// 1. it selects the UrlEventLayers that match the current route, and sorts them by the number
//    of matching url parameters.
// 2. it finds the UrlEventLayer that contains the userSelectedAnEmployee event handler.
// 3. it executes the userSelectedAnEmployee event handler.
//
// The above means that:
// - the handling of url events is context dependent.
// - the component that fires the event does not need to know anything about the url.

export class UrlEventHandler {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  hiddenParams: ObjT = {};
  eventLayers: Array<UrlEventLayer> = [];

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

  installEventLayer(
    name: string,
    route: string,
    createEventLayer: CreateEventLayerFunctionT
  ) {
    const urlEventLayer = R.find(
      (x: UrlEventLayer) => x.name === name,
      this.eventLayers
    );
    if (R.isNil(urlEventLayer)) {
      this.eventLayers.push(createEventLayer(name, route));
    }
  }

  getEventLayer(name: string) {
    return R.find((x: UrlEventLayer) => x.name === name)(this.eventLayers);
  }

  uninstallEventLayer(name: string) {
    this.eventLayers = this.eventLayers.filter(
      (urlEventLayer: UrlEventLayer) => urlEventLayer.name !== name
    );
  }

  _getEventHandler(name: string): Function | null {
    const sortedLayers = sortLayers(this.eventLayers, pathname());
    for (let i = sortedLayers.length - 1; i >= 0; i--) {
      const layer = sortedLayers[i];
      const handler = (layer as ObjT)[name];
      if (handler) {
        return handler;
      }
    }
    return null;
  }

  constructor(props: PropsT) {
    this.history = props.history;
    this.routes = props.routes;
    this.routeUfns = props.routeUfns;

    makeObservable(this, {
      eventLayers: observable,
      installEventLayer: action,
      uninstallEventLayer: action,
    });
  }
}

export function createUrlEventHandler(props: PropsT) {
  const urlEventHandler = new UrlEventHandler(props);
  return new Proxy(urlEventHandler, {
    get(target, prop: string) {
      if (prop in target) {
        return (target as any)[prop];
      }

      const eventHandler = target._getEventHandler(prop);
      if (eventHandler) {
        return eventHandler.bind(target);
      }
      console.warn(`UrlEventHandler: no handler for ${prop}`);
      return () => {};
    },
  });
}

export function sortLayers(
  layers: UrlEventLayer[],
  pathname: string
): UrlEventLayer[] {
  type ResultT = {
    layer: UrlEventLayer;
    match: ObjT | null;
  };

  let result: ResultT[] = [];
  for (const layer of layers) {
    const match = matchPath(pathname, {
      path: layer.route,
      strict: false,
    });
    result.push({ layer, match });
  }

  const nrMatchingParams = (match: ObjT | null) =>
    R.keys(match?.params ?? {}).length;

  result = R.sort((lhs: ResultT, rhs: ResultT) => {
    const lhsScore = nrMatchingParams(lhs.match);
    const rhsScore = nrMatchingParams(rhs.match);
    return lhsScore > rhsScore || (lhsScore === rhsScore && lhs.match?.isExact);
  }, result);

  return R.map((result: ResultT) => result.layer, result);
}
