import { setCallbackMap } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistPdCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props.savePlaylistPd(this.args.values);
      },
    },
    cancel: {},
  } as EditCbs);
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
