import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { getPlaylistQueryKey } from 'src/api/queries';
import { updateQueries } from 'src/api/queryClient';
import { ClipFormT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { addOrReplaceListItem } from 'src/utils/addOrReplaceListItem';
import { applyUpdate } from 'src/utils/applyUpdate';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlistSlug: string;
  playlistId: string;
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
        playlistId: $playlistId
        parentClipId: $parentClipId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.saveClip
    );
  });
};

export const useSaveClip = () => {
  return useMutation({
    mutationKey: ['saveClip'],
    mutationFn: saveClip,
    onSuccess: (response: ObjT, args: ArgsT) => {
      updateQueries({
        queryKey: getPlaylistQueryKey({ playlistSlug: args.playlistSlug }),
        invalidate: true,
        update: (data: any) =>
          // Add or replace saved clip in playlist
          applyUpdate(['playlist'], data, (playlist: PlaylistT) => {
            return {
              ...playlist,
              clipSet: addOrReplaceListItem(
                playlist.clipSet,
                args.parentClipId,
                args.clipForm
              ),
            };
          }),
      });
    },
  });
};
