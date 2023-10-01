import { Cbs } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr } from 'skandha';
import { Edit } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistPdCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  ctr.edit.callbackMap = {
    save: {
      saveItem(this: Cbs<Edit['save']>) {
        return state.props.savePlaylistPd(this.args.values);
      },
    },
    cancel: {},
  };
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
