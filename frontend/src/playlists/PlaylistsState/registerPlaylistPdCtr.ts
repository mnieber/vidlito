import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistPdCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};

export const registerPlaylistPdCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistPdCtr,
    options: { name: 'PlaylistsState.PlaylistPd' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
