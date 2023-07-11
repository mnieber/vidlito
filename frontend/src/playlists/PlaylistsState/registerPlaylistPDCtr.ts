import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistPDCtr;

  mapDataToProps(ctr, {
    store: {
      playlistPD: () => state.props.getPlaylistPD(),
    },
  });
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistPDCtr;

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylistPD(this.args.values)
          .then((localPlaylist: PlaylistPDT) => {
            return localPlaylist;
          });
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerPlaylistPDCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistPDCtr,
    options: { name: 'PlaylistsState.PlaylistPD' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
