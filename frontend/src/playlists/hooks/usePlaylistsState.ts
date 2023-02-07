import * as R from 'ramda';
import React from 'react';

import {
  useDeletePlaylist,
  useGetPlaylist,
  useSavePlaylist,
  useSavePlaylistOrdering,
} from 'src/api/endpoints';
import { useMutationData, useQueryData } from 'src/api/hooks';
import { setToReady, setToUpdating } from 'src/api/ResourceState';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { PlaylistsState } from 'src/playlists/PlaylistsState';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export const usePlaylistsState = () => {
  const deletePlaylist = useMutationData(useDeletePlaylist());
  const savePlaylist = useMutationData(useSavePlaylist());
  const savePlaylistOrdering = useMutationData(useSavePlaylistOrdering());

  const [playlistsState] = React.useState(
    () =>
      new PlaylistsState({
        deletePlaylists: (ids: string[]) => {
          const playlists = lookUp(
            ids,
            playlistsState.playlists.data.playlistById
          );
          R.map(setToUpdating, playlists);
          return Promise.all(
            R.map(
              (x: string) => deletePlaylist.mutateAsync({ playlistId: x }),
              ids
            )
          ).then(() => {
            R.map(setToReady, playlists);
          });
        },
        savePlaylist: (values: ObjT) => {
          return savePlaylist.mutateAsync(values).then(() => {
            return values.playlistForm;
          });
        },
        savePlaylistOrdering: (playlists: PlaylistT[]) => {
          return savePlaylistOrdering.mutateAsync({
            playlistIds: getIds(playlists),
          });
        },
      })
  );

  const getPlaylist = useQueryData(
    useGetPlaylist({
      playlistId: playlistsState.playlists.highlight.id,
    })
  );

  React.useEffect(() => () => playlistsState.destroy(), [playlistsState]);

  return {
    playlistsState,
    getPlaylist,
    deletePlaylist,
    savePlaylist,
    savePlaylistOrdering,
  };
};
