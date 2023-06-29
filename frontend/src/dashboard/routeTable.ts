import { RouteTable } from '/src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    playlist: () => '/playlist/:ownerUsername/:playlistSlug',
    clip: () => '/playlist/:ownerUsername/:playlistSlug/:clipSlug',
    actions: () => '/playlist/:ownerUsername/:playlistSlug/actions/_',
    search: () => '/search',
  });

  return routeTable;
};
