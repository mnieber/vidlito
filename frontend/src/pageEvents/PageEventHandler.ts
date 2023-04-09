import * as R from 'ramda';
import { getBestRouteMatch } from 'src/routes/utils/getRouteMatches';
import { ObjT } from 'src/utils/types';
import { pathname } from 'src/utils/urls';

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
  eventHandlersStack: Array<[string, Record<string, Function>]> = [];

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

  installEventHandlers(name: string, eventHandlers: Record<string, Function>) {
    this.eventHandlersStack.push([name, eventHandlers]);
  }

  uninstallEventHandlers(name: string) {
    this.eventHandlersStack = this.eventHandlersStack.filter(
      ([layerName]) => layerName !== name
    );
  }

  _getEventHandler(name: string): Function | null {
    for (let i = this.eventHandlersStack.length - 1; i >= 0; i--) {
      const [, eventHandlers] = this.eventHandlersStack[i];
      const handler = eventHandlers[name];
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
