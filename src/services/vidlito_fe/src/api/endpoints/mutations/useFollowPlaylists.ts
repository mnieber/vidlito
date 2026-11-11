import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { invalidateLoadUserId } from '/src/auth/endpoints/queries';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistIds: string[];
  isFollowing: boolean;
  folderId?: string;
};

export const followPlaylists = (args: ArgsT) => {
  return doQuery(
    `mutation followPlaylists(
      $playlistIds: [UUID]!
      $isFollowing: Boolean!
      $folderId: UUID
    ) {
      followPlaylists(
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
    return wait(import.meta.env.DEV ? 1000 : 0, response.followPlaylists);
  });
};

export const useFollowPlaylists = () => {
  return useObservableMutation({
    mutationFn: followPlaylists,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return Promise.all([invalidateLoadUserId({})]);
    },
  });
};
