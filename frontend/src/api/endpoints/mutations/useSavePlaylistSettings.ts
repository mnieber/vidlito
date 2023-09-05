import { useObservableMutation } from '/src/api/ObservableMutation';
import { invalidateGetPlaylist } from '/src/api/endpoints/queries';
import { doQuery } from '/src/api/graphqlClient';
import { PlaylistSettingsFormT } from '/src/api/types/PlaylistSettingsT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistSlug: string;
  playlistSettingsForm: PlaylistSettingsFormT;
};

export const savePlaylistSettings = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistSettings(
      $playlistSettingsForm: PlaylistSettingsFormT!
    ) {
      savePlaylistSettings(
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
  return useObservableMutation({
    mutationFn: savePlaylistSettings,
    onSuccess: (response: ObjT, args: ArgsT) => {
      invalidateGetPlaylist({ playlistSlug: args.playlistSlug });
    },
  });
};
