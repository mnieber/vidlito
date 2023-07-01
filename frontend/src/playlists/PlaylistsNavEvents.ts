import { PlaylistT } from '/src/api/types/PlaylistT';
import { getNavFn } from '/src/navHandler/NavHandler';

export const navToPlaylist = (playlist: PlaylistT): void =>
  getNavFn('navToPlaylist', navToPlaylist)(playlist);
