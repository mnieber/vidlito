import { useObservableMutation } from '/src/api/ObservableMutation';
import { doQuery } from '/src/api/graphqlClient';
import { invalidateGetPlaylist } from '/src/api/queries';
import { PlaylistPdFormT } from '/src/api/types/PlaylistPdT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
  playlistPdForm: PlaylistPdFormT;
};

export const savePlaylistPd = (args: ArgsT) => {
  return doQuery(
    `mutation savePlaylistPd(
      $playlistId: UUID!
      $playlistPdForm: PlaylistPdFormT!
    ) {
      savePlaylistPd(
        playlistId: $playlistId
        playlistPdForm: $playlistPdForm
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.savePlaylistPd);
  });
};

export const useSavePlaylistPd = () => {
  return useObservableMutation({
    mutationFn: savePlaylistPd,
    onSuccess: (response: ObjT, args: ArgsT) => {
      invalidateGetPlaylist({ playlistSlug: args.playlistSlug });
    },
  });
};
