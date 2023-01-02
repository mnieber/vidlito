import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useMutationData } from 'src/api/hooks';
import { queryClient } from 'src/api/queryClient';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { applyUpdate } from 'src/utils/applyUpdate';
import { sortByIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistId: string;
  clipIds: string[];
};

export const saveClipOrdering = (args: ArgsT) => {
  return doQuery(
    `mutation saveClipOrdering(
      $playlistId: ID!
      $clipIds: [String]!
    ) {
      saveClipOrdering(
        clipIds: $clipIds
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
      response.saveClipOrdering
    );
  });
};

export const useSaveClipOrdering = () => {
  const mutation = useMutation(['saveClipOrdering'], saveClipOrdering, {
    onMutate: (args: ArgsT) => {
      const updatePlaylist = (playlist: PlaylistT) => {
        playlist.clipSet = sortByIds(playlist.clipSet, args.clipIds);
      };
      queryClient.setQueriesData(['getPlaylists'], (data: any) => {
        applyUpdate('playlists.*', data, updatePlaylist);
        return data;
      });
    },
  });
  return useMutationData(mutation);
};
