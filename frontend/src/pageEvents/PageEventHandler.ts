import * as R from 'ramda';
import { matchPath } from 'react-router-dom';
import { getBestRouteMatch } from 'src/routes/utils/getRouteMatches';
import { ObjT } from 'src/utils/types';
import { pathname } from 'src/utils/urls';

export class PageEventLayer {
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

export class PageEventHandler {
  history: any;
  routes: ObjT;
  routeUfns: ObjT;
  hiddenParams: ObjT = {};
  eventHandlersStack: Array<PageEventLayer> = [];

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

  installEventHandlers(name: string, route: string, pageEventLayerClass: any) {
    console.log('installEventHandlers', name, route);
    const pageEventLayer = R.find(
      (x: PageEventLayer) => x.name === name,
      this.eventHandlersStack
    );
    if (R.isNil(pageEventLayer)) {
      this.eventHandlersStack.push(new pageEventLayerClass(name, route));
    }
  }

  uninstallEventHandlers(name: string) {
    console.log('uninstallEventHandlers', name);
    this.eventHandlersStack = this.eventHandlersStack.filter(
      (pageEventLayer: PageEventLayer) => pageEventLayer.name !== name
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
  }
}

export function createPageEventHandler(props: PropsT) {
  const pageEventHandler = new PageEventHandler(props);
  return new Proxy(pageEventHandler, {
    get(target, prop: string) {
      if (prop in target) {
        return (target as any)[prop];
      }

      const eventHandler = target._getEventHandler(prop);
      if (eventHandler) {
        return eventHandler.bind(target);
      }
      console.warn(`PageEventHandler: no handler for ${prop}`);
      return () => {};
    },
  });
}

export function sortLayers(
  layers: PageEventLayer[],
  pathname: string
): PageEventLayer[] {
  type ResultT = {
    layer: PageEventLayer;
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
