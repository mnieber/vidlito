import React from 'react';
import { Highlight } from 'skandha-facets';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import {
  SavePlaylistArgsT,
  SavePlaylistOrderingArgsT,
  useDeletePlaylists,
  useGetPlaylist,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import {
  SavePlaylistPdArgsT,
  SavePlaylistSettingsArgsT,
} from '/src/api/mutations';
import { useFollowPlaylists } from '/src/api/mutations/useFollowPlaylists';
import { useSavePlaylistPd } from '/src/api/mutations/useSavePlaylistPd';
import { useSavePlaylistSettings } from '/src/api/mutations/useSavePlaylistSettings';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { navHandler } from '/src/navHandler/NavHandler';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { useSmartUpdatePlaylists } from '/src/playlists/hooks/useSmartUpdatePlaylists';
import { initRS } from '/src/resourceStates';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { getIds, lookUp } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  getUserProfile: () => UserProfileT | undefined;
};

export const usePlaylistsState = (props: PropsT) => {
  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
  const smartUpdatePlaylists = useSmartUpdatePlaylists();

  // The value of playlistSlugRef is based on the current url, but we use
  // playlistsState.playlistsCtr.highlight.item?.slug as a fallback.
  const playlistHighlightRef = React.useRef<Highlight | undefined>();
  const getPlaylistSlug = () =>
    navHandler.getParams().playlistSlug ??
    playlistHighlightRef.current?.item?.slug;

  // Mutations
  const deletePlaylists = initRS(useDeletePlaylists());
  const savePlaylist = initRS(useSavePlaylist());
  const savePlaylistPd = initRS(useSavePlaylistPd());
  const savePlaylistSettings = initRS(useSavePlaylistSettings());
  const savePlaylistOrdering = initRS(useSavePlaylistOrdering());
  const followPlaylists = useFollowPlaylists();

  // Queries
  const isGetPlaylistEnabled = () =>
    !!getPlaylistSlug() && getPlaylistSlug() !== 'new-playlist';
  const getPlaylist = useObservableQuery(
    useGetPlaylist(
      { playlistSlug: getPlaylistSlug() },
      {
        enabled: isGetPlaylistEnabled(),
        onError: () =>
          playlistsState.playlistsCtr.highlight.highlightItem({
            id: undefined,
          }),
      }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );

  const playlistsState = useBuilder(() => {
    return new PlaylistsState({
      //
      getPlaylists: () => {
        return graftResourceStatesFromMemo({
          resources: smartUpdatePlaylists(
            props.getUserProfile()?.followSet,
            !!getPlaylist.data
              ? (getPlaylist.data!.playlist as PlaylistT)
              : undefined
          ),
        });
      },
      //
      getFollowedPlaylists: () => {
        return props.getUserProfile()?.followSet ?? [];
      },
      //
      deletePlaylists: (ids: string[]) => {
        const playlists = lookUp(
          ids,
          playlistsState.playlistsCtr.display.itemById
        );
        return trackPromise({
          name: 'deletePlaylists',
          states: { updating: [...playlists, deletePlaylists] },
          promise: deletePlaylists.mutateAsync(ids),
        }).result;
      },
      //
      followPlaylist: (playlist: PlaylistT, flag: boolean) => {
        followPlaylists.mutateAsync;
        return trackPromise({
          name: 'followPlaylist',
          states: { updating: [followPlaylists] },
          promise: followPlaylists.mutateAsync({
            playlistIds: [playlist.id],
            isFollowing: flag,
          }),
        }).result;
      },
      //
      savePlaylist: (values: ObjT) => {
        return trackPromise<PlaylistT>({
          name: 'savePlaylist',
          states: { updating: [savePlaylist] },
          promise: savePlaylist
            .mutateAsync(values as SavePlaylistArgsT)
            .then((response: ObjT) => {
              return response.playlist as PlaylistT;
            }),
        }).result;
      },
      //
      savePlaylistPd: (values: ObjT) => {
        return trackPromise<PlaylistPdT>({
          name: 'savePlaylistPd',
          states: { updating: [savePlaylistPd] },
          promise: savePlaylistPd
            .mutateAsync({
              playlistId: playlistsState.playlistsCtr.highlight.item?.id,
              playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
              playlistPdForm: values.playlistPdForm,
            } as SavePlaylistPdArgsT)
            .then(() => {
              return values.playlistPdForm as PlaylistPdT;
            }),
        }).result;
      },
      //
      savePlaylistSettings: (values: ObjT) => {
        return trackPromise<PlaylistSettingsT>({
          name: 'savePlaylistSettings',
          states: { updating: [savePlaylistSettings] },
          promise: savePlaylistSettings
            .mutateAsync({
              playlistId: playlistsState.playlistsCtr.highlight.item?.id,
              playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
              playlistSettingsForm: values.playlistSettingsForm,
            } as SavePlaylistSettingsArgsT)
            .then(() => {
              return values.playlistSettingsForm as PlaylistSettingsT;
            }),
        }).result;
      },
      //
      savePlaylistOrdering: (playlists: PlaylistT[]) => {
        return trackPromise({
          name: 'savePlaylistOrdering',
          states: { updating: [savePlaylistOrdering] },
          promise: savePlaylistOrdering.mutateAsync({
            playlistIds: getIds(playlists),
          } as SavePlaylistOrderingArgsT),
        }).result;
      },
    });
  }) as PlaylistsState;
  playlistHighlightRef.current = playlistsState.playlistsCtr.highlight;

  React.useEffect(() => () => playlistsState.destroy(), [playlistsState]);

  return {
    playlistsState,
    deletePlaylists,
    savePlaylist,
    savePlaylistOrdering,
    isGetPlaylistLoading: () =>
      isQueryLoading(getPlaylist) && isGetPlaylistEnabled(),
    isGetPlaylistUpdating: () =>
      isQueryUpdating(getPlaylist) && isGetPlaylistEnabled(),
  };
};
