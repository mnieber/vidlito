import * as R from 'ramda';
import React from 'react';
import {
  DeletePlaylistArgsT,
  SavePlaylistArgsT,
  SavePlaylistOrderingArgsT,
  useDeletePlaylist,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from 'src/api/endpoints';
import { useMutationData } from 'src/api/hooks';
import { setToReady, setToUpdating } from 'src/api/ResourceState';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {};

export const usePlaylistsState = (props: PropsT) => {
  const deletePlaylist = useMutationData(useDeletePlaylist());
  const savePlaylist = useMutationData(useSavePlaylist());
  const savePlaylistOrdering = useMutationData(useSavePlaylistOrdering());

  const [playlistsState] = React.useState(() => {
    return new PlaylistsState({
      deletePlaylists: (ids: string[]) => {
        const playlists = lookUp(
          ids,
          playlistsState.playlistsCtr.data.playlistById
        );
        R.map(setToUpdating, playlists);
        return Promise.all(
          R.map(
            (x: string) =>
              deletePlaylist.mutateAsync({
                playlistId: x,
              } as DeletePlaylistArgsT),
            ids
          )
        ).then((response: ObjT) => {
          R.map(setToReady, playlists);
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
    deletePlaylist,
    savePlaylist,
    savePlaylistOrdering,
  };
};
