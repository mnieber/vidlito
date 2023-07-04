import { useMutation } from '@tanstack/react-query';
import * as R from 'ramda';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { applyUpdate } from '/src/utils/applyUpdate';
import { sortByIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
  clipIds: string[];
};

export const saveClipOrdering = (args: ArgsT) => {
  return doQuery(
    `mutation saveClipOrdering(
      $playlistId: UUID!
      $clipIds: [UUID]!
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
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveClipOrdering);
  });
};

export const useSaveClipOrdering = () => {
  return useMutation({
    mutationKey: ['saveClipOrdering'],
    mutationFn: saveClipOrdering,
    onMutate: (args: ArgsT) => {
      queryClient.setQueriesData(
        { queryKey: getPlaylistQueryKey({ playlistSlug: args.playlistSlug }) },
        (data: any) =>
          // Reorder clips in playlist.clipSet
          applyUpdate(['playlist'], data, (playlist: PlaylistT) => {
            return R.isNil(playlist.clipSet)
              ? playlist
              : {
                  ...playlist,
                  clipSet: sortByIds(playlist.clipSet, args.clipIds),
                };
          })
      );
    },
  });
};
