import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { queryClient } from '/src/api/queryClient';
import { loadUserIdQueryKey } from '/src/auth/endpoints';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
  isFollowing: boolean;
  folderId?: string;
};

export const followPlaylists = (args: ArgsT) => {
  return doQuery(
    `mutation followPlaylist(
      $playlistIds: [UUID]!
      $isFollowing: Boolean!
      $folderId: UUID
    ) {
      followPlaylist(
        folderId: $folderId
        isFollowing: $isFollowing
        playlistIds: $playlistIds
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

export const useFollowPlaylists = () => {
  return useObservableMutation({
    mutationFn: followPlaylists,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: loadUserIdQueryKey({}) }),
      ]);
    },
  });
};
