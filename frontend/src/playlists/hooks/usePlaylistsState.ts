import React from 'react';
import {
  SavePlaylistArgsT,
  SavePlaylistOrderingArgsT,
  useDeletePlaylists,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from 'src/api/endpoints';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { initRS } from 'src/resourceStates';
import { trackPromise } from 'src/resourceStates/trackPromise';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {};

export const usePlaylistsState = (props: PropsT) => {
  const deletePlaylists = initRS(useDeletePlaylists());
  const savePlaylist = initRS(useSavePlaylist());
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
        return trackPromise({
          name: 'savePlaylist',
          //
          promise: savePlaylist
            .mutateAsync(values as SavePlaylistArgsT)
            .then(() => {
              return values.playlistForm;
            }),
          //
          states: {
            updating: [savePlaylist],
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
  });

  React.useEffect(() => () => playlistsState.destroy(), [playlistsState]);

  return {
    playlistsState,
    deletePlaylists,
    savePlaylist,
    savePlaylistOrdering,
  };
};
