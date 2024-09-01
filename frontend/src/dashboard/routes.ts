import { history } from '/src/routes/history';
import { IDashboardNav, navHandler, RouteSpecT } from '/src/routes/navHandler';
import { generatePath } from '/src/routes/utils/generatePath';

export const dashboardRoutes = {
  playlist: '/playlist/:ownerUsername/:playlistSlug',
  clip: '/playlist/:ownerUsername/:playlistSlug/:clipSlug',
  actions: '/actions',
  playlistActions: '/actions/:playlistSlug',
  search: '/search',
};

export class DashboardNav implements IDashboardNav {
  routes = dashboardRoutes;

  playlist(
    params: { ownerUsername: string; playlistSlug: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('playlist', params, callerId);
  }

  clip(
    params: { ownerUsername: string; playlistSlug: string; clipSlug: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('clip', params, callerId);
  }

  actions(params: {}, callerId?: string): RouteSpecT {
    return this.run('actions', params, callerId);
  }

  playlistActions(
    params: { playlistSlug: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('playlistActions', params, callerId);
  }

  search(params: {}, callerId?: string): RouteSpecT {
    return this.run('search', params, callerId);
  }

  protected run(name: string, params: any, callerId?: string): RouteSpecT {
    return this.navHandler().run(name, params, callerId);
  }

  protected navHandler() {
    return navHandler();
  }
}

export class DefaultDashboardNavHandler extends DashboardNav {
  playlist(
    params: { ownerUsername: string; playlistSlug: string },
    callerId?: string
  ) {
    return {
      url: generatePath(dashboardRoutes.playlist, params),
      nav: history.push,
    };
  }

  clip(
    params: { ownerUsername: string; playlistSlug: string; clipSlug: string },
    callerId?: string
  ) {
    return {
      url: generatePath(dashboardRoutes.clip, params),
      nav: history.push,
    };
  }

  actions(params: {}, callerId?: string) {
    return {
      url: generatePath(dashboardRoutes.actions, params),
      nav: history.push,
    };
  }

  playlistActions(params: { playlistSlug: string }, callerId?: string) {
    return {
      url: generatePath(dashboardRoutes.playlistActions, params),
      nav: history.push,
    };
  }

  search(params: {}, callerId?: string) {
    return {
      url: generatePath(dashboardRoutes.search, params),
      nav: history.push,
    };
  }
}
export const dashboardNav = new DashboardNav();
