import { setCallbackMap } from 'aspiration';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { EditCbs } from 'skandha-facets';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistsState, PropsT } from '/src/playlists/PlaylistsState';

export const initPlaylistPD = (state: PlaylistsState, props: PropsT) => {
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
