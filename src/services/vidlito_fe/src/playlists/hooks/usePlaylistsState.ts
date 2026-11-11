import { trackPromise } from 'mobx-resource-states';
import React from 'react';
import { Highlight } from 'skandha-facets';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import {
  useDeletePlaylists,
  useGetPlaylist,
  useSavePlaylist,
  useSavePlaylistOrdering,
  type DeletePlaylistsArgsT,
  type SavePlaylistArgsT,
  type SavePlaylistOrderingArgsT,
} from '/src/api/endpoints';
import {
  SavePlaylistPdArgsT,
  SavePlaylistSettingsArgsT,
} from '/src/api/endpoints/mutations';
import { useFollowPlaylists } from '/src/api/endpoints/mutations/useFollowPlaylists';
import { useSavePlaylistPd } from '/src/api/endpoints/mutations/useSavePlaylistPd';
import { useSavePlaylistSettings } from '/src/api/endpoints/mutations/useSavePlaylistSettings';
import { useObservableQuery } from '/src/api/hooks';
import { PlaylistPdT } from '/src/api/types/PlaylistPdT';
import { PlaylistSettingsT } from '/src/api/types/PlaylistSettingsT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { useSmartUpdatePlaylists } from '/src/playlists/hooks/useSmartUpdatePlaylists';
import { getRouteParams } from '/src/routes/utils/getRouteParams';
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
    getRouteParams().playlistSlug ?? playlistHighlightRef.current?.item?.slug;

  // Mutations
  const deletePlaylists = useDeletePlaylists();
  const savePlaylist = useSavePlaylist();
  const savePlaylistPd = useSavePlaylistPd();
  const savePlaylistSettings = useSavePlaylistSettings();
  const savePlaylistOrdering = useSavePlaylistOrdering();
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
          playlistsState.playlistsCtr.highlight.set({
            itemId: undefined,
          }),
      }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );

  const playlistsState = useBuilder<PlaylistsState>(() => {
    return new PlaylistsState({
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
          states: { updating: playlists },
          promise: deletePlaylists.mutateAsync({
            playlistIds: ids,
          } as DeletePlaylistsArgsT),
        }).result;
      },
      //
      followPlaylist: (playlist: PlaylistT, flag: boolean) => {
        return followPlaylists.mutateAsync({
          playlistIds: [playlist.id],
          isFollowing: flag,
        });
      },
      //
      savePlaylist: (values: ObjT) => {
        return savePlaylist
          .mutateAsync(values as SavePlaylistArgsT)
          .then((response: ObjT) => {
            return response.playlist as PlaylistT;
          });
      },
      //
      savePlaylistPd: (values: ObjT) => {
        return savePlaylistPd
          .mutateAsync({
            playlistId: playlistsState.playlistsCtr.highlight.item?.id,
            playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
            playlistPdForm: values.playlistPdForm,
          } as SavePlaylistPdArgsT)
          .then(() => {
            return values.playlistPdForm as PlaylistPdT;
          });
      },
      //
      savePlaylistSettings: (values: ObjT) => {
        return savePlaylistSettings
          .mutateAsync({
            playlistId: playlistsState.playlistsCtr.highlight.item?.id,
            playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
            playlistSettingsForm: values.playlistSettingsForm,
          } as SavePlaylistSettingsArgsT)
          .then(() => {
            return values.playlistSettingsForm as PlaylistSettingsT;
          });
      },
      //
      savePlaylistOrdering: (playlists: PlaylistT[]) => {
        return savePlaylistOrdering.mutateAsync({
          playlistIds: getIds(playlists),
        } as SavePlaylistOrderingArgsT);
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
