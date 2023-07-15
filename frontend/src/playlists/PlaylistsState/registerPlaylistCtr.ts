import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistCtr;

  mapDataToProps(ctr, {});
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.playlistCtr;

  setCallbackMap(ctr.pdEdit, {
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

export const registerPlaylistCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistCtr,
    options: { name: 'PlaylistsState.Playlist' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
