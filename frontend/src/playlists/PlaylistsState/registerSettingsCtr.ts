import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

const mapData = (state: PlaylistsState) => {
  const ctr = state.settingsCtr;

  mapDataToProps(ctr, {});
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.settingsCtr;

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylistSettings(this.args.values)
          .then((localPlaylist: PlaylistSettingsT) => {
            return localPlaylist;
          });
      },
    },
    cancel: {},
  } as EditCbs);
};

export const registerSettingsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.settingsCtr,
    options: { name: 'PlaylistsState.PlaylistSettings' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
