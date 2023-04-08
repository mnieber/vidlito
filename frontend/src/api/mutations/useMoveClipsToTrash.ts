import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { getActionsQueryKey, getPlaylistQueryKey } from 'src/api/queries';
import { updateQueries } from 'src/api/queryClient';
import { PlaylistT, removeClips } from 'src/api/types/PlaylistT';
import { applyUpdate } from 'src/utils/applyUpdate';
import { ObjT } from 'src/utils/types';
import { wait } from 'src/utils/wait';

export type ArgsT = {
  playlist: PlaylistT;
  clipIds: string[];
};

export const moveClipsToTrash = (args: ArgsT) => {
  return doQuery(
    `mutation moveClipsToTrash(
      $playlistId: UUID!
      $clipIds: [UUID]!
    ) {
      moveClipsToTrash(
        clipIds: $clipIds
        playlistId: $playlistId
      ) {
        errors
        success
      }
    }`,
    {
      playlistId: args.playlist.id,
      clipIds: args.clipIds,
    }
  ).then((response: ObjT) => {
    return wait(
      process.env.NODE_ENV === 'development' ? 1000 : 0,
      response.moveClipsToTrash
    );
  });
};

export const useMoveClipsToTrash = () => {
  return useMutation({
    mutationKey: ['moveClipsToTrash'],
    mutationFn: moveClipsToTrash,
    onSuccess: (response: ObjT, args: ArgsT) => {
      updateQueries({
        queryKey: getPlaylistQueryKey({ playlistSlug: args.playlist.slug }),
        invalidate: true,
        update: (data: any) =>
          // Remove trashed clips from playlist
          applyUpdate(['playlist'], data, (playlist: PlaylistT) =>
            removeClips(playlist, args.clipIds)
          ),
      });

      updateQueries({
        queryKey: getActionsQueryKey({ playlistId: args.playlist.id }),
        invalidate: true,
      });

      updateQueries({
        queryKey: getActionsQueryKey({ playlistId: undefined }),
        invalidate: true,
      });
    },
  });
};
