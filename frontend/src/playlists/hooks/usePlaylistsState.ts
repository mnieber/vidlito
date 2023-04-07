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
import { trackPromise } from 'src/resourceStates/trackPromise';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {};

export const usePlaylistsState = (props: PropsT) => {
  const deletePlaylists = useDeletePlaylists();
  const savePlaylist = useSavePlaylist();
  const savePlaylistOrdering = useSavePlaylistOrdering();

  const playlistsState = useBuilder(() => {
    return new PlaylistsState({
      deletePlaylists: (ids: string[]) => {
        const playlists = lookUp(
          ids,
          playlistsState.playlistsCtr.data.playlistById
        );

        const mutation = deletePlaylists.mutateAsync(ids);
        return trackPromise({
          promise: mutation,
          name: 'deletePlaylists',
          resourcesToUpdate: playlists,
        }).result;
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
  };
};
