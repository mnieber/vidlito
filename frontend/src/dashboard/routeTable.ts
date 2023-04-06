import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    playlist: [
      () => '/playlist/:ownerUsername/:playlistSlug',
      (ownerUsername: string, playlistSlug: string) => ({
        ownerUsername,
        playlistSlug,
      }),
    ],
    clip: [
      () => '/playlist/:ownerUsername/:playlistSlug/:clipSlug',
      (ownerUsername: string, playlistSlug: string, clipSlug: string) => ({
        ownerUsername,
        playlistSlug,
        clipSlug,
      }),
    ],
    actions: [
      () => '/playlist/:ownerUsername/:playlistSlug/actions/_',
      (ownerUsername: string, playlistSlug?: string) => ({
        ownerUsername,
        playlistSlug,
      }),
    ],
  });

  return routeTable;
};
