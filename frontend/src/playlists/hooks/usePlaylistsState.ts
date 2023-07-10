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
import { SavePlaylistPDArgsT } from '/src/api/mutations';
import { useSavePlaylistPD } from '/src/api/mutations/useSavePlaylistPD';
import { useGetPlaylistPD } from '/src/api/queries';
import { PlaylistPDT, createPlaylistPD } from '/src/api/types/PlaylistPDT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
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
  const params = useNavHandlerParams();

  // The value of playlistSlugRef is based on playlistsState.playlistsCtr.highlight.
  // Since playlistsState is not defined yet, we use a ref that we later update.
  // This means that the first time we call getPlaylistSlug, we will get the
  // value from the URL. After that, we will get the value either from the
  // playlistHighlightRef or from the URL.
  const playlistHighlightRef = React.useRef<Highlight | undefined>();
  const getPlaylistSlug = () =>
    playlistHighlightRef.current?.item?.slug ?? params.playlistSlug;

  // Mutations
  const deletePlaylists = initRS(useDeletePlaylists());
  const savePlaylist = initRS(useSavePlaylist());
  const savePlaylistPD = initRS(useSavePlaylistPD());
  const savePlaylistOrdering = initRS(useSavePlaylistOrdering());

  // Queries
  const isGetPlaylistEnabled = () => getPlaylistSlug() !== 'new-playlist';
  const getPlaylist = useObservableQuery(
    useGetPlaylist(
      { playlistSlug: getPlaylistSlug() },
      { enabled: isGetPlaylistEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylist' }
  );
  const getPlaylistPD = useObservableQuery(
    useGetPlaylistPD(
      { playlistSlug: getPlaylistSlug() },
      { enabled: isGetPlaylistEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getPlaylistPD' }
  );

  const playlistsState = useBuilder(() => {
    return new PlaylistsState({
      //
      getPlaylists: () => {
        return graftResourceStatesFromMemo({
          resources: smartUpdatePlaylists(
            props.getUserProfile()?.followSet,
            getPlaylist.data?.playlist
          ),
        });
      },
      //
      getFollowedPlaylists: () => {
        return props.getUserProfile()?.followSet ?? [];
      },
      //
      getPlaylistPD: () => {
        return getPlaylistPD.data?.playlistPD ?? createPlaylistPD();
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
      savePlaylist: (values: ObjT) => {
        return trackPromise<PlaylistT>({
          name: 'savePlaylist',
          states: { updating: [savePlaylist] },
          promise: savePlaylist
            .mutateAsync(values as SavePlaylistArgsT)
            .then(() => {
              return values.playlistForm as PlaylistT;
            }),
        }).result;
      },
      //
      savePlaylistPD: (values: ObjT) => {
        return trackPromise<PlaylistPDT>({
          name: 'savePlaylistPD',
          states: { updating: [savePlaylistPD] },
          promise: savePlaylistPD
            .mutateAsync({
              playlistId: playlistsState.playlistsCtr.highlight.item?.id,
              playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
              playlistPDForm: values.playlistPDForm,
            } as SavePlaylistPDArgsT)
            .then(() => {
              return values.playlistPDForm as PlaylistPDT;
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
      isGetPlaylistEnabled() && isQueryLoading(getPlaylist),
    isGetPlaylistUpdating: () =>
      isGetPlaylistEnabled() && isQueryUpdating(getPlaylist),
    isGetPlaylistPDLoading: () =>
      isGetPlaylistEnabled() && isQueryLoading(getPlaylistPD),
    isGetPlaylistPDUpdating: () =>
      isGetPlaylistEnabled() && isQueryUpdating(getPlaylistPD),
  };
};
