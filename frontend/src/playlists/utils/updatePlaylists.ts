import * as R from 'ramda';
import { PlaylistT } from 'src/api/types/PlaylistT';

export const updatePlaylists = (
  playlists: PlaylistT[],
  playlist?: PlaylistT
) => {
  const playlistIdx =
    playlist && playlists
      ? R.findIndex(R.propEq('id', playlist.id), playlists)
      : -1;
  const updatedPlaylists =
    playlistIdx >= 0
      ? R.update(playlistIdx, playlist!, playlists)
      : playlists ?? [];
  return updatedPlaylists;
};
