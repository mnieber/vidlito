import { useMutation } from '@tanstack/react-query';
import * as R from 'ramda';
import { doQuery } from 'src/api/graphqlClient';
import { ArgsT as GetPlaylistArgsT } from 'src/api/queries/useGetPlaylist';
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
  return useMutation({
    mutationKey: ['saveClipOrdering'],
    mutationFn: saveClipOrdering,
    onMutate: (args: ArgsT) => {
      const updatePlaylist = (playlist: PlaylistT) => {
        return R.isNil(playlist.clipSet)
          ? playlist
          : {
              ...playlist,
              clipSet: sortByIds(playlist.clipSet, args.clipIds),
            };
      };

      queryClient.setQueriesData(
        {
          queryKey: [
            'getPlaylist',
            { playlistId: args.playlistId } as GetPlaylistArgsT,
          ],
        },
        (data: any) => {
          return applyUpdate(['playlist'], data, updatePlaylist);
        }
      );
    },
  });
};
