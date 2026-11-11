import { addCleanUpFunctionToCtr, cleanUpCtr, mapDataToProps } from 'skandha';
import { registerCtr } from 'skandha-mobx';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';

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

export const registerPlaylistSettingsCtr = (state: PlaylistsState) => {
  registerCtr({
    ctr: state.playlistSettingsCtr,
    options: { name: 'PlaylistsState.PlaylistSettings' },
    initCtr: () => {
      mapData(state);
      addCleanUpFunctionToCtr(state, () =>
        cleanUpCtr(state.playlistSettingsCtr)
      );
    },
  });
};
