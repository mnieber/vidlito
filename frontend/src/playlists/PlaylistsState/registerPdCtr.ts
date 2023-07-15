import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {
  const ctr = state.pdCtr;

  mapDataToProps(ctr, {});
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.pdCtr;

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylistPd(this.args.values)
          .then((localPlaylist: PlaylistPdT) => {
            return localPlaylist;
          });
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerPdCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.pdCtr,
    options: { name: 'PlaylistsState.PlaylistPd' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
