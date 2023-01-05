import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    myDashboard: () => '/dashboard/my-dashboard',
    playlist: [
      () => '/dashboard/playlist/:playlistSlug',
      (playlist: PlaylistT) => ({ playlistSlug: playlist.slug }),
    ],
    clip: [
      () => '/dashboard/playlist/:playlistSlug/:clipSlug',
      (playlist: PlaylistT, clip: ClipT) => ({
        playlistSlug: playlist.slug,
        clipSlug: clip.slug,
      }),
    ],
  });

  return routeTable;
};
