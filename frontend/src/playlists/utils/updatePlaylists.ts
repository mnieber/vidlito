import * as R from 'ramda';
import { PlaylistT } from '/src/api/types/PlaylistT';

export const updatePlaylists = (
  playlists: PlaylistT[],
  playlist?: PlaylistT
) => {
  const playlistIdx =
    playlist && playlists
      ? R.findIndex(R.propEq(playlist.id, 'id'), playlists)
      : -1;
  if (playlistIdx >= 0) {
    return R.update(playlistIdx, playlist!, playlists);
  }
  if (playlist) {
    return [...playlists, playlist];
  }
  return playlists;
};
