import { useMutation } from '@tanstack/react-query';
import { doQuery } from '/src/api/graphqlClient';
import { getPlaylistQueryKey } from '/src/api/queries';
import { queryClient } from '/src/api/queryClient';
import { PlaylistSettingsFormT } from '/src/api/types/PlaylistSettingsT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
  playlistSettingsForm: PlaylistSettingsFormT;
};

export const savePlaylistSettings = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistSettings(
      $playlistId: UUID!
      $playlistSettingsForm: PlaylistSettingsFormT!
    ) {
      savePlaylistSettings(
        playlistId: $playlistId
        playlistSettingsForm: $playlistSettingsForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.savePlaylistSettings);
  });
};

export const useSavePlaylistSettings = () => {
  return useMutation({
    mutationKey: ['savePlaylistSettings'],
    mutationFn: savePlaylistSettings,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return queryClient.invalidateQueries({
        queryKey: getPlaylistQueryKey({ playlistSlug: args.playlistSlug }),
      });
    },
  });
};
