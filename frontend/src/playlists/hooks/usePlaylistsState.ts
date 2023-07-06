import React from 'react';
import {
  SavePlaylistArgsT,
  SavePlaylistOrderingArgsT,
  useDeletePlaylists,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from '/src/api/endpoints';
import { SavePlaylistPDArgsT } from '/src/api/mutations';
import { useSavePlaylistPD } from '/src/api/mutations/useSavePlaylistPD';
import { PlaylistPDT } from '/src/api/types/PlaylistPDT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { PlaylistsState } from '/src/playlists/PlaylistsState';
import { initRS } from '/src/resourceStates';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { getIds, lookUp } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {};

export const usePlaylistsState = (props: PropsT) => {
  const deletePlaylists = initRS(useDeletePlaylists());
  const savePlaylist = initRS(useSavePlaylist());
  const savePlaylistPD = initRS(useSavePlaylistPD());
  const savePlaylistOrdering = initRS(useSavePlaylistOrdering());

  const playlistsState = useBuilder(() => {
    return new PlaylistsState({
      deletePlaylists: (ids: string[]) => {
        const playlists = lookUp(
          ids,
          playlistsState.playlistsCtr.display.itemById
        );

        return trackPromise({
          name: 'deletePlaylists',
          //
          promise: deletePlaylists.mutateAsync(ids),
          //
          states: {
            updating: [...playlists, deletePlaylists],
          },
        }).result;
      },
      savePlaylist: (values: ObjT) => {
        return trackPromise<PlaylistT>({
          name: 'savePlaylist',
          //
          promise: savePlaylist
            .mutateAsync(values as SavePlaylistArgsT)
            .then(() => {
              return values.playlistForm as PlaylistT;
            }),
          //
          states: {
            updating: [savePlaylist],
          },
        }).result;
      },
      savePlaylistPD: (values: ObjT) => {
        return trackPromise<PlaylistPDT>({
          name: 'savePlaylistPD',
          //
          promise: savePlaylistPD
            .mutateAsync({
              playlistId: playlistsState.playlistsCtr.highlight.item?.id,
              playlistSlug: playlistsState.playlistsCtr.highlight.item?.slug,
              playlistPDForm: values.playlistPDForm,
            } as SavePlaylistPDArgsT)
            .then(() => {
              return values.playlistPDForm as PlaylistPDT;
            }),
          //
          states: {
            updating: [savePlaylistPD],
          },
        }).result;
      },
      savePlaylistOrdering: (playlists: PlaylistT[]) => {
        return trackPromise({
          name: 'savePlaylistOrdering',
          //
          promise: savePlaylistOrdering.mutateAsync({
            playlistIds: getIds(playlists),
          } as SavePlaylistOrderingArgsT),
          //
          states: {
            updating: [savePlaylistOrdering],
          },
        }).result;
      },
    });
  }) as PlaylistsState;

  React.useEffect(() => () => playlistsState.destroy(), [playlistsState]);

  return {
    playlistsState,
    deletePlaylists,
    savePlaylist,
    savePlaylistOrdering,
  };
};
