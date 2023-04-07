import React from 'react';
import { addUpdater } from 'src/api/ResourceState';
import {
  SavePlaylistArgsT,
  SavePlaylistOrderingArgsT,
  useDeletePlaylists,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from 'src/api/endpoints';
import { useMutationData } from 'src/api/hooks';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {};

export const usePlaylistsState = (props: PropsT) => {
  const deletePlaylists = useMutationData(useDeletePlaylists());
  const savePlaylist = useMutationData(useSavePlaylist());
  const savePlaylistOrdering = useMutationData(useSavePlaylistOrdering());

  const playlistsState = useBuilder(() => {
    return new PlaylistsState({
      deletePlaylists: (ids: string[]) => {
        const playlists = lookUp(
          ids,
          playlistsState.playlistsCtr.data.playlistById
        );
        const removeUpdater = addUpdater(
          playlists,
          deletePlaylists,
          'deletePlaylist'
        );

        return deletePlaylists.mutateAsync(ids).then((response: ObjT) => {
          removeUpdater();
          return response;
        });
      },
      savePlaylist: (values: ObjT) => {
        return savePlaylist
          .mutateAsync(values as SavePlaylistArgsT)
          .then(() => {
            return values.playlistForm;
          });
      },
      savePlaylistOrdering: (playlists: PlaylistT[]) => {
        return savePlaylistOrdering.mutateAsync({
          playlistIds: getIds(playlists),
        } as SavePlaylistOrderingArgsT);
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
