import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {};

export const registerPlaylistPdCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistPdCtr,
    options: { name: 'PlaylistsState.PlaylistPd' },
    initCtr: () => {
      mapData(state);
      addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.playlistPdCtr));
    },
  });
};
