import { RouteTable } from '/src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    playlist: () => '/playlist/:ownerUsername/:playlistSlug',
    clip: () => '/playlist/:ownerUsername/:playlistSlug/:clipSlug',
    actions: () => '/actions',
    search: () => '/search',
  });

  return routeTable;
};
