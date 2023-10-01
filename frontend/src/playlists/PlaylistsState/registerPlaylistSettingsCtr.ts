import { Cbs } from 'aspiration';
import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { Edit } from 'skandha-facets';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { Following } from '/src/playlists/PlaylistsState/facets/Following';

const mapData = (state: PlaylistsState) => {
  const ctr = state.playlistSettingsCtr;

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
  const ctr = state.playlistSettingsCtr;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));

  ctr.edit.callbackMap = {
    save: {
      saveItem(this: Cbs<Edit['save']>) {
        return state.props.savePlaylistSettings(this.args.values);
      },
    },
    cancel: {},
  };

  ctr.following.callbackMap = {
    followPlaylist: {
      followPlaylist(this: Cbs<Following['followPlaylist']>) {
        return state.props.followPlaylist(
          ctr.following.playlist!,
          this.args.flag
        );
      },
    },
  };
};

export const registerPlaylistSettingsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistSettingsCtr,
    options: { name: 'PlaylistsState.PlaylistSettings' },
    initCtr: () => {
      mapData(state);
      setCallbacks(state);
    },
  });
};
