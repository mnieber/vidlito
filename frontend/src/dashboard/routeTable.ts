import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { RouteTable } from 'src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    playlist: [
      () => '/playlist/:playlistSlug',
      (playlist: PlaylistT) => ({ playlistSlug: playlist.slug }),
    ],
    clip: [
      () => '/playlist/:playlistSlug/clips/:clipSlug?',
      (playlist: PlaylistT, clip: ClipT) => ({
        playlistSlug: playlist.slug,
        clipSlug: clip.slug,
      }),
    ],
    actions: [
      () => '/playlist/:playlistSlug/actions',
      (playlist?: PlaylistT) => ({
        playlistSlug: playlist?.slug,
      }),
    ],
  });

  return routeTable;
};
