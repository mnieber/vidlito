import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistsState, PropsT } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState, props: PropsT) => {
  const ctr = state.playlistPDCtr;

  mapDataToProps(ctr, {
    store: {
      playlistPD: () => props.getPlaylistPD(),
    },
  });
};

const setCallbacks = (state: PlaylistsState, props: PropsT) => {
  const ctr = state.playlistPDCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return props
          .savePlaylistPD(this.args.values)
          .then((localPlaylist: PlaylistPDT) => {
            return localPlaylist;
          });
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerPlaylistPDCtr = (state: PlaylistsState, props: PropsT) => {
  registerCtr({
    ctr: state.playlistPDCtr,
    options: { name: 'PlaylistsState.PlaylistPD' },
    initCtr: () => {
      setCallbacks(state, props);
      mapData(state, props);
    },
  });
};
