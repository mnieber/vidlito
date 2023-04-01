import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { queryClient } from 'src/api/queryClient';
import { PlaylistFormT } from 'src/api/types/PlaylistT';
import { UserProfileT } from 'src/api/types/UserProfileT';
import { addOrReplaceListItem } from 'src/utils/addOrReplaceListItem';
import { applyUpdate } from 'src/utils/applyUpdate';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistForm: PlaylistFormT;
  parentPlaylistId?: string;
};

export const savePlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylist(
      $playlistForm: PlaylistFormT!
    ) {
      savePlaylist(
        playlistForm: $playlistForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.savePlaylist
    );
  });
};

export const useSavePlaylist = () => {
  return useMutation({
    mutationKey: ['savePlaylist'],
    mutationFn: savePlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      const loadUserIdQueryKey = ['loadUserId'];

      const updateUserProfile = (userProfile: UserProfileT) => {
        return {
          ...userProfile,
          playlistSet: addOrReplaceListItem(
            userProfile.playlistSet,
            args.parentPlaylistId,
            args.playlistForm
          ),
        };
      };

      queryClient.setQueriesData(
        { queryKey: loadUserIdQueryKey },
        (data: any) => applyUpdate(['userProfile'], data, updateUserProfile)
      );

      queryClient.invalidateQueries({
        queryKey: loadUserIdQueryKey,
      });
    },
  });
};
