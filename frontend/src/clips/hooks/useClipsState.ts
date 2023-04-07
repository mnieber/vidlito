import { action } from 'mobx';
import React from 'react';
import { isRunning } from 'src/api/MutationData';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from 'src/api/endpoints';
import { useMutationData } from 'src/api/hooks';
import { MoveClipsToPlaylistArgsT, SaveClipArgsT } from 'src/api/mutations';
import { moveClipsToPlaylist } from 'src/api/mutations/useMoveClipsToPlaylist';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { ClipsState } from 'src/clips/ClipsState';
import { addUpdater } from 'src/resourceStates';
import { trackPromise } from 'src/resourceStates/trackPromise';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { usePropsRef } from 'src/utils/hooks/usePropsRef';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  playlist: PlaylistT;
};

export const useClipsState = (props: PropsT) => {
  const moveClipsToTrash = useMutationData(useMoveClipsToTrash());
  const saveClip = useMutationData(useSaveClip());
  const saveClipOrdering = useMutationData(useSaveClipOrdering());

  const propsRef = usePropsRef(props);

  const clipsState = useBuilder<ClipsState>(() => {
    return new ClipsState({
      moveClipsToTrash: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        const removeUpdater = addUpdater(
          clips,
          () => isRunning(moveClipsToTrash),
          'moveClipsToTrash',
          { lock: true }
        );
        return moveClipsToTrash
          .mutateAsync({
            playlist: propsRef.current?.playlist,
            clipIds: ids,
          } as MoveClipsToTrashArgsT)
          .then((response: ObjT) => {
            removeUpdater();
            return response;
          });
      }),
      saveClip: (values: ObjT) => {
        return saveClip
          .mutateAsync({
            playlistId: propsRef.current?.playlist.id,
            playlistSlug: propsRef.current?.playlist.slug,
            clipForm: values.clipForm,
            parentClipId: clipsState.clipsCtr.addition.parentId,
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
        const mutation = moveClipsToPlaylist({
          srcPlaylistId: propsRef.current?.playlist.id,
          srcPlaylistSlug: propsRef.current?.playlist.slug,
          destPlaylistId: playlistId,
          clipIds: getIds(clips),
          copy,
        } as MoveClipsToPlaylistArgsT);

        return trackPromise({
          promise: mutation,
          name: 'moveClipsToPlaylist',
          resourcesToUpdate: [...clips, propsRef.current?.playlist],
          lockResources: true,
        }).result;
      },
    });
  }) as ClipsState;

  React.useEffect(() => () => clipsState.destroy(), [clipsState]);

  return {
    clipsState,
    moveClipsToTrash,
    saveClip,
    saveClipOrdering,
  };
};
