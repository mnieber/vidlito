import { action } from 'mobx';
import React from 'react';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useMoveClipsToPlaylist,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from 'src/api/endpoints';
import { MoveClipsToPlaylistArgsT, SaveClipArgsT } from 'src/api/mutations';
import { ClipT } from 'src/api/types/ClipT';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { ClipsState } from 'src/clips/ClipsState';
import { trackPromise } from 'src/resourceStates/trackPromise';
import { useBuilder } from 'src/utils/hooks/useBuilder';
import { usePropsRef } from 'src/utils/hooks/usePropsRef';
import { getIds, lookUp } from 'src/utils/ids';
import { ObjT } from 'src/utils/types';

export type PropsT = {
  playlist: PlaylistT;
};

export const useClipsState = (props: PropsT) => {
  const moveClipsToTrash = useMoveClipsToTrash();
  const moveClipsToPlaylist = useMoveClipsToPlaylist();
  const saveClip = useSaveClip();
  const saveClipOrdering = useSaveClipOrdering();

  const propsRef = usePropsRef(props);

  const clipsState = useBuilder<ClipsState>(() => {
    return new ClipsState({
      moveClipsToTrash: action((ids: string[]) => {
        const mutation = moveClipsToTrash.mutateAsync({
          playlist: propsRef.current?.playlist,
          clipIds: ids,
        } as MoveClipsToTrashArgsT);

        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          promise: mutation,
          name: 'moveClipsToTrash',
          resourcesToUpdate: [...clips, propsRef.current?.playlist],
        }).result;
      }),
      saveClip: (values: ObjT) => {
        const mutation = saveClip
          .mutateAsync({
            playlistId: propsRef.current?.playlist.id,
            playlistSlug: propsRef.current?.playlist.slug,
            clipForm: values.clipForm,
            parentClipId: clipsState.clipsCtr.addition.parentId,
          } as SaveClipArgsT)
          .then(() => {
            return values.clipForm;
          });

        return trackPromise({
          promise: mutation,
          name: 'saveClip',
        }).result;
      },
      saveClipOrdering: (clips: ClipT[]) => {
        const mutation = saveClipOrdering.mutateAsync({
          playlistSlug: propsRef.current?.playlist.slug,
          playlistId: propsRef.current?.playlist.id,
          clipIds: getIds(clips),
        } as SaveClipOrderingArgsT);

        return trackPromise({
          promise: mutation,
          name: 'saveClipOrdering',
          resourcesToUpdate: [propsRef.current?.playlist],
        }).result;
      },
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        copy: boolean
      ) => {
        const mutation = moveClipsToPlaylist.mutateAsync({
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
        }).result;
      },
    });
  }) as ClipsState;

  React.useEffect(() => () => clipsState.destroy(), [clipsState]);

  return {
    clipsState,
  };
};
