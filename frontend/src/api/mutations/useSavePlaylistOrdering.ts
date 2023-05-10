import { useMutation } from '@tanstack/react-query';
import * as R from 'ramda';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { applyUpdate } from '/src/utils/applyUpdate';
import { sortByIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
};

export const savePlaylistOrdering = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistOrdering(
      $playlistIds: [UUID]!
    ) {
      savePlaylistOrdering(
        playlistIds: $playlistIds
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.savePlaylistOrdering);
  });
};

export const useSavePlaylistOrdering = () => {
  return useMutation({
    mutationKey: ['savePlaylistOrdering'],
    mutationFn: savePlaylistOrdering,
    onMutate: (args: ArgsT) => {
      const updateUserProfile = (userProfile: UserProfileT) => {
        return R.isNil(userProfile.playlistSet)
          ? userProfile
          : {
              ...userProfile,
              playlistSet: sortByIds(userProfile.playlistSet, args.playlistIds),
            };
      };
      queryClient.setQueriesData({ queryKey: ['loadUserId'] }, (data: any) => {
        return applyUpdate(['userProfile'], data, updateUserProfile);
      });
    },
  });
};
