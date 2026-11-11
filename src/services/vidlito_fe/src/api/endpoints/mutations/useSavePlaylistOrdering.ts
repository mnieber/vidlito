import * as R from 'ramda';
import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
import { applyUpdate } from '/src/utils/applyUpdate';
import { sortByIds } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
  folderId?: string;
};

export const savePlaylistOrdering = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistOrdering(
      $playlistIds: [UUID]!
      $folderId: UUID
    ) {
      savePlaylistOrdering(
        folderId: $folderId
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
  return useObservableMutation({
    mutationFn: savePlaylistOrdering,
    onMutate: (args: ArgsT) => {
      const updateUserProfile = (userProfile: UserProfileT) => {
        return R.isNil(userProfile.followSet)
          ? userProfile
          : {
              ...userProfile,
              followSet: sortByIds(userProfile.followSet, args.playlistIds),
            };
      };
      queryClient.setQueryData(loadUserIdQueryKey({}), (data: any) => {
        return applyUpdate(['userProfile'], data, updateUserProfile);
      });
    },
  });
};
