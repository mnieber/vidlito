import { setCallbackMap } from 'aspiration';
import { mapDataToProps } from 'skandha';
import { EditCbs } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { FollowingCbs } from '/src/playlists/PlaylistsState/facets/Following';

const mapData = (state: PlaylistsState) => {
  const ctr = state.settingsCtr;

  mapDataToProps(ctr, {
    following: {
      playlist: () => state.playlistsCtr.highlight.item,
      isFollowing: () =>
        !!state.props
          .getFollowedPlaylists()
          .find((x: PlaylistT) => x.id === ctr.following.playlist?.id),
    },
  });
};

const setCallbacks = (state: PlaylistsState) => {
  const ctr = state.settingsCtr;

  setCallbackMap(ctr.edit, {
    save: {
      saveItem(this: EditCbs['save']) {
        return state.props
          .savePlaylistSettings(this.args.values)
          .then((localPlaylistSettings: PlaylistSettingsT) => {
            return localPlaylistSettings;
          });
      },
    },
    cancel: {},
  } as EditCbs);

  setCallbackMap(ctr.following, {
    followPlaylist: {
      followPlaylist(this: FollowingCbs['followPlaylist']) {
        return state.props.followPlaylist(
          ctr.following.playlist!,
          this.args.flag
        );
      },
    },
  } as FollowingCbs);
};

export const registerPlaylistSettingsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.settingsCtr,
    options: { name: 'PlaylistsState.PlaylistSettings' },
    initCtr: () => {
      setCallbacks(state);
      mapData(state);
    },
  });
};
