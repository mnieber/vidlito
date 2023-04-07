import { useMutation } from '@tanstack/react-query';
import * as R from 'ramda';
import { doQuery } from 'src/api/graphqlClient';
import { updateQueries } from 'src/api/queryClient';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
};

export const deletePlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation deletePlaylist(
      $playlistId: UUID!
    ) {
      deletePlaylist(
        playlistId: $playlistId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.deletePlaylist
    );
  });
};

export const useDeletePlaylists = () => {
  return useMutation({
    mutationKey: ['deletePlaylists'],
    mutationFn: (playlistIds: string[]) =>
      Promise.all(
        R.map(
          (playlistId: string) =>
            deletePlaylist({
              playlistId,
            } as ArgsT),
          playlistIds
        )
      ),
    onSuccess: (response: ObjT) => {
      updateQueries({
        queryKey: ['getUserProfile'],
        invalidate: true,
      });
    },
  });
};
