import { createNavHandler } from '/src/routes/createNavHandler';
import { ObjT } from '/src/utils/types';

export type RouteSpecT = {
  url: string;
  nav: (url: string) => void;
};

export interface IDashboardNav {
  routes: ObjT;
}

export class NavHandler {
  navHandlers: IDashboardNav[] = [];
  defaultNavHandlers: IDashboardNav[] = [];

  getRoutes = () => {
    const routes: any = [];
    for (const navHandlers of [this.navHandlers, this.defaultNavHandlers]) {
      for (const navHandler of navHandlers) {
        for (const route of navHandler.routes.values()) {
          if (typeof route === 'string') {
            if (routes.indexOf(route) === -1) {
              routes.push(route);
            }
          }
        }
      }
    }
    return routes;
  };

  installNavHandler(navHandler: any) {
    this.navHandlers.push(navHandler);
  }

  installDefaultNavHandler(navHandler: any) {
    this.defaultNavHandlers.push(navHandler);
  }

  run(name: string, params: any, callerId?: string) {
    for (const handlers of [this.navHandlers, this.defaultNavHandlers]) {
      for (const navHandler of handlers) {
        const handlerFn = (navHandler as any)[name];
        if (!handlerFn) {
          continue;
        }

        const result = handlerFn(params, callerId);
        if (result) {
          return result;
        }
      }
    }
    throw new Error(`No nav handler found for ${name}`);
  }
}

export const navTo = (routeAndNav: RouteSpecT) => {
  routeAndNav.nav(routeAndNav.url);
};

export const ext = (route: string) => {
  return `${route}/*?`;
};

let _navHandler: NavHandler | undefined = undefined;

export const navHandler = () => {
  if (!_navHandler) {
    _navHandler = createNavHandler();
  }
  return _navHandler;
};
