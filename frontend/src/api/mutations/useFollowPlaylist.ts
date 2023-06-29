import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  isFollowing: boolean;
};

export const followPlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation followPlaylist(
      $playlistId: String!
      $isFollowing: Boolean!
    ) {
      followPlaylist(
        playlistId: $playlistId
        isFollowing: $isFollowing
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(!!import.meta.env.DEV ? 1000 : 0, response.followPlaylist);
  });
};

export const useFollowPlaylist = () => {
  return useMutation({
    mutationKey: ['followPlaylist'],
    mutationFn: followPlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ['loadUserId'] }),
      ]);
    },
  });
};
