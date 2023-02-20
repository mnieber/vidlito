import { action } from 'mobx';
import * as R from 'ramda';
import React from 'react';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useMoveClipsToPlaylist,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from 'src/api/endpoints';
import { useMutationData } from 'src/api/hooks';
import { MoveClipsToPlaylistArgsT, SaveClipArgsT } from 'src/api/mutations';
import { setToReady, setToUpdating } from 'src/api/ResourceState';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { ClipsState } from 'src/clips/ClipsState';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  playlist: PlaylistT;
};

export const useClipsState = (props: PropsT) => {
  const moveClipsToPlaylist = useMutationData(useMoveClipsToPlaylist());
  const moveClipsToTrash = useMutationData(useMoveClipsToTrash());
  const saveClip = useMutationData(useSaveClip());
  const saveClipOrdering = useMutationData(useSaveClipOrdering());

  const propsRef = React.useRef<ObjT>();
  propsRef.current = { ...props };

  const [clipsState] = React.useState<ClipsState>(() => {
    return new ClipsState({
      moveClipsToTrash: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clips.data.clipById);
        R.map(setToUpdating, clips);
        return moveClipsToTrash
          .mutateAsync({
            playlist: propsRef.current?.playlist,
            clipIds: ids,
          } as MoveClipsToTrashArgsT)
          .then(
            action((response: ObjT) => {
              R.map(setToReady, clips);
              return response;
            })
          );
      }),
      saveClip: (values: ObjT) => {
        return saveClip
          .mutateAsync({
            playlistId: propsRef.current?.playlist.id,
            clipForm: values.clipForm,
          } as SaveClipArgsT)
          .then(() => {
            return values.clipForm;
          });
      },
      saveClipOrdering: (clips: ClipT[]) => {
        return saveClipOrdering.mutateAsync({
          playlistSlug: propsRef.current?.playlist.slug,
          playlistId: propsRef.current?.playlist.id,
          clipIds: getIds(clips),
        } as SaveClipOrderingArgsT);
      },
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        copy: boolean
      ) => {
        return moveClipsToPlaylist.mutateAsync({
          srcPlaylistId: propsRef.current?.playlist.id,
          srcPlaylistSlug: propsRef.current?.playlist.slug,
          destPlaylistId: playlistId,
          clipIds: getIds(clips),
          copy,
        } as MoveClipsToPlaylistArgsT);
      },
    });
  }) as ClipsState[];

  React.useEffect(() => () => clipsState.destroy(), [clipsState]);

  return {
    clipsState,
    moveClipsToTrash,
    moveClipsToPlaylist,
    saveClip,
    saveClipOrdering,
  };
};
