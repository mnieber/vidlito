import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistPdCtr;

  mapDataToProps(ctr, {});
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistPdCtr;

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylistPd(this.args.values)
          .then((localPlaylistPd: PlaylistPdT) => {
            return localPlaylistPd;
          });
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
      setCallbacks(state);
      mapData(state);
    },
  });
};
