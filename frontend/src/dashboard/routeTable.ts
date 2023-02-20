import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    playlist: [
      () => '/playlist/:playlistSlug',
      (playlistSlug: string) => ({ playlistSlug: playlistSlug }),
    ],
    clip: [
      () => '/playlist/:playlistSlug/clips/:clipSlug?',
      (playlistSlug: string, clipSlug: string) => ({
        playlistSlug,
        clipSlug,
      }),
    ],
    actions: [
      () => '/playlist/:playlistSlug/actions',
      (playlistSlug?: string) => ({
        playlistSlug: playlistSlug,
      }),
    ],
  });

  return routeTable;
};
