import { RouteTable } from '/src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();
  routeTable.addRoutes(routes);
  return routeTable;
};

export const routes = {
  playlist: () => '/playlist/:ownerUsername/:playlistSlug',
  clip: () => '/playlist/:ownerUsername/:playlistSlug/:clipSlug',
  actions: () => '/actions',
  playlistActions: () => '/actions/:playlistSlug',
  search: () => '/search',
};

export type RoutesT = {
  playlist: (params: { ownerUsername: string; playlistSlug: string }) => string;
  clip: (params: {
    ownerUsername: string;
    playlistSlug: string;
    clipSlug: string;
  }) => string;
  actions: () => string;
  playlistActions: (params: { playlistSlug: string }) => string;
  search: () => string;
};
