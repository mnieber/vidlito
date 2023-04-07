import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { getPlaylistQueryKey } from 'src/api/queries';
import { updateQueries } from 'src/api/queryClient';
import { PlaylistT, removeClips } from 'src/api/types/PlaylistT';
import { applyUpdate } from 'src/utils/applyUpdate';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  srcPlaylistId: string;
  srcPlaylistSlug: string;
  destPlaylistId: string;
  clipIds: string[];
  copy: boolean;
};

export const moveClipsToPlaylist = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToPlaylist(
      $srcPlaylistId: UUID!
      $destPlaylistId: UUID!
      $clipIds: [UUID]!
      $copy: Boolean!
    ) {
      moveClipsToPlaylist(
        clipIds: $clipIds
        copy: $copy
        destPlaylistId: $destPlaylistId
        srcPlaylistId: $srcPlaylistId
      ) {
        errors
        success
      }
    }`,
    args
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.moveClipsToPlaylist
    );
  });
};

export const useMoveClipsToPlaylist = () => {
  return useMutation({
    mutationKey: ['moveClipsToPlaylist'],
    mutationFn: moveClipsToPlaylist,
    onSuccess: (response: ObjT, args: ArgsT) => {
      updateQueries({
        queryKey: getPlaylistQueryKey({ playlistSlug: args.srcPlaylistSlug }),
        invalidate: true,
        update: (data: any) =>
          // Remove clips from playlist
          applyUpdate(['playlist'], data, (playlist: PlaylistT) =>
            removeClips(playlist, args.clipIds)
          ),
      });
    },
  });
};
