import { useMutation } from '@tanstack/react-query';
import { doQuery } from 'src/api/graphqlClient';
import { GetActionsQueryKeyT } from 'src/api/queries';
import { queryClient } from 'src/api/queryClient';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
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
      $playlistId: ID!
      $clipIds: [String]!
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
      const updatePlaylist = (playlist: PlaylistT) => {
        return {
          ...playlist,
          clipSet: playlist.clipSet.filter(
            (clip: ClipT) => !args.clipIds.includes(clip.id)
          ),
        };
      };

      queryClient.setQueriesData(
        {
          queryKey: ['getPlaylist', args.playlist.slug],
        },
        (data: any) => {
          return applyUpdate(['playlist'], data, updatePlaylist);
        }
      );

      queryClient.invalidateQueries([
        {
          queryKey: ['getPlaylist', args.playlist.slug],
        },
        {
          queryKey: [
            'getActions',
            { playlistId: args.playlist.id } as GetActionsQueryKeyT,
          ],
        },
      ]);
    },
  });
};
