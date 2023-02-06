import * as R from 'ramda';
import React from 'react';
import {
  useMoveClipsToPlaylist,
  useSaveClip,
  useSaveClipOrdering,
} from 'src/api/endpoints';
import { useMutationData } from 'src/api/hooks';
import {
  useMoveClipsToTrash,
  type MoveClipsToTrashArgsT,
} from 'src/api/mutations';
import { setToReady, setToUpdating } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { ClipsState } from 'src/clips/ClipsState';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  playlistId: string;
};

export const useClipsState = (props: PropsT) => {
  const moveClipsToTrash = useMutationData(useMoveClipsToTrash());
  const saveClip = useMutationData(useSaveClip());
  const saveClipOrdering = useMutationData(useSaveClipOrdering());
  const moveClipsToPlaylist = useMutationData(useMoveClipsToPlaylist());

  const [clipsState] = React.useState(() => {
    return new ClipsState({
      deleteClips: (ids: string[]) => {
        const clips = lookUp(ids, clipsState.clips.data.clipById);
        R.map(setToUpdating, clips);
        return moveClipsToTrash
          .mutateAsync({
            playlistId: props.playlistId,
            clipIds: ids,
          } as MoveClipsToTrashArgsT)
          .then((response: ObjT) => {
            R.map(setToReady, clips);
            return response;
          });
      },
      saveClip: (values: ObjT) => {
        return saveClip.mutateAsync(values).then(() => {
          return values.clipForm;
        });
      },
      saveClipOrdering: (clips: ClipT[]) => {
        return saveClipOrdering.mutateAsync({
          playlistId: props.playlistId,
          clipIds: getIds(clips),
        });
      },
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        copy: boolean
      ) => {
        return moveClipsToPlaylist.mutateAsync({
          srcPlaylistId: props.playlistId,
          destPlaylistId: playlistId,
          clipIds: getIds(clips),
          copy,
        });
      },
    });
  });

  return {
    clipsState,
    moveClipsToTrash,
    saveClip,
    saveClipOrdering,
    moveClipsToPlaylist,
  };
};
