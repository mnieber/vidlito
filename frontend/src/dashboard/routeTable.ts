import { ClipT } from 'src/api/types/ClipT';
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
      (playlistSlug: string, clip: ClipT) => ({
        playlistSlug: playlistSlug,
        clipSlug: clip.slug,
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
