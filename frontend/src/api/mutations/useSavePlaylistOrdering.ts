import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { useMutationData } from 'src/api/hooks';
import { queryClient } from 'src/api/queryClient';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { applyUpdate } from 'src/utils/applyUpdate';
import { sortByIds } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
};

export const savePlaylistOrdering = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistOrdering(
      $playlistIds: [String]!
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
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.savePlaylistOrdering
    );
  });
};

export const useSavePlaylistOrdering = () => {
  const mutation = useMutation(['savePlaylistOrdering'], savePlaylistOrdering, {
    onMutate: (args: ArgsT) => {
      const updateUserProfile = (userProfile: UserProfileT) => {
        userProfile.playlistSet = sortByIds(
          userProfile.playlistSet,
          args.playlistIds
        );
      };
      queryClient.setQueriesData(['getUserProfile'], (data: any) => {
        applyUpdate('userProfile', data, updateUserProfile);
        return data;
      });
    },
  });
  return useMutationData(mutation);
};
