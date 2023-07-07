import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useObservableQuery } from '/src/api/hooks';
import { useGetPlaylistPD } from '/src/api/queries';
import { createPlaylistPD } from '/src/api/types/PlaylistPDT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { PlaylistsState } from '/src/playlists/PlaylistsState/PlaylistsState';
import { useGetPlaylistObservableQuery } from '/src/playlists/hooks/useGetPlaylistObservableQuery';
import { updatePlaylists } from '/src/playlists/utils/updatePlaylists';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { log } from '/src/utils/logging';

export type PropsT = {
  getUserProfile: () => UserProfileT | undefined;
  playlistsState: PlaylistsState;
};

export const useUpdatePlaylistsState = (props: PropsT) => {
  const params = useNavHandlerParams();
  const getPlaylistSlug = () =>
    props.playlistsState.playlistsCtr.highlight.item?.slug ??
    params.playlistSlug;
  const isGetPlaylistEnabled = () => getPlaylistSlug() !== 'new-playlist';

  const { getPlaylistData, getPlaylist } = useGetPlaylistObservableQuery({
    playlistSlug: getPlaylistSlug(),
    enabled: isGetPlaylistEnabled(),
    playlistsState: props.playlistsState,
  });

  const getPlaylistPD = useObservableQuery(
    useGetPlaylistPD(
      { playlistSlug: getPlaylistSlug() },
      { enabled: isGetPlaylistEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylistPD' }
  );

  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
  useUpdateStateReaction({
    getInputs: () => {
      return {
        playlist: getPlaylistData(),
        userProfile: props.getUserProfile(),
        playlistPD: getPlaylistPD.data?.playlistPD,
      };
    },
    updateState: (inputs) => {
      const followSet = inputs.userProfile?.followSet ?? [];
      const playlists = updatePlaylists(followSet, inputs.playlist);

      props.playlistsState.playlistsCtr.store.followedPlaylists = followSet;
      props.playlistsState.playlistsCtr.store.items =
        graftResourceStatesFromMemo({ resources: playlists });
      props.playlistsState.playlistPDCtr.store.playlistPD =
        inputs.playlistPD ?? createPlaylistPD();
    },
    logState: () => {
      log('PlaylistsState updated', props.playlistsState.getSummary());
    },
  });

  return {
    isGetPlaylistLoading: () =>
      isGetPlaylistEnabled() && isQueryLoading(getPlaylist),
    isGetPlaylistUpdating: () =>
      isGetPlaylistEnabled() && isQueryUpdating(getPlaylist),
    isGetPlaylistPDLoading: () =>
      isGetPlaylistEnabled() && isQueryLoading(getPlaylistPD),
    isGetPlaylistPDUpdating: () =>
      isGetPlaylistEnabled() && isQueryUpdating(getPlaylistPD),
    getPlaylist,
  };
};
