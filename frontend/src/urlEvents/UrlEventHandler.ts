import { makeObservable, observable } from 'mobx';
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

// This class handles page events. A page event is an event that is relevant
// not just to a particular component but to a page. For example, when a user
// selects an item in a list of persons, then we may want to change the url
export class UrlEventHandler {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  hiddenParams: ObjT = {};
  eventHandlersStack: Array<UrlEventLayer> = [];

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

  installEventHandlers(name: string, route: string, urlEventLayerClass: any) {
    const urlEventLayer = R.find(
      (x: UrlEventLayer) => x.name === name,
      this.eventHandlersStack
    );
    if (R.isNil(urlEventLayer)) {
      this.eventHandlersStack.push(new urlEventLayerClass(name, route));
    }
  }

  uninstallEventHandlers(name: string) {
    this.eventHandlersStack = this.eventHandlersStack.filter(
      (urlEventLayer: UrlEventLayer) => urlEventLayer.name !== name
    );
  }

  _getEventHandler(name: string): Function | null {
    const sortedLayers = sortLayers(this.eventHandlersStack, pathname());
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
      eventHandlersStack: observable,
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
