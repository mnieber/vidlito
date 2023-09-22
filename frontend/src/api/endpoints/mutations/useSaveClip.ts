import { useObservableMutation } from '/src/api/ObservableMutation';
import { invalidateGetPlaylist } from '/src/api/endpoints/queries';
import { clipFields } from '/src/api/endpoints/queries/useGetPlaylist';
import { doQuery } from '/src/api/graphqlClient';
import { ClipFormT } from '/src/api/types/ClipT';
import { ObjT } from '/src/utils/types';
import { wait } from '/src/utils/wait';

export type ArgsT = {
  playlistId: string;
  playlistSlug: string;
  clipForm: ClipFormT;
  parentClipId?: string;
};

export const saveClip = (args: ArgsT) => {
  return doQuery(
    `mutation saveClip(
      $playlistId: UUID!
      $clipForm: ClipFormT!
      $parentClipId: UUID
    ) {
      saveClip(
        clipForm: $clipForm
        parentClipId: $parentClipId
        playlistId: $playlistId
      ) {
        clip {
          ${clipFields}
        }
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(import.meta.env.DEV ? 1000 : 0, response.saveClip);
  });
};

export const useSaveClip = () => {
  return useObservableMutation({
    mutationFn: saveClip,
    onSuccess: (response: ObjT, args: ArgsT) => {
      return invalidateGetPlaylist({});
    },
  });
};
