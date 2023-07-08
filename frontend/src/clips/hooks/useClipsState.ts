import { action } from 'mobx';
import React from 'react';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useMoveClipsToPlaylist,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from '/src/api/endpoints';
import {
  MoveClipsToPlaylistArgsT,
  SaveClipArgsT,
  SaveClipPDArgsT,
} from '/src/api/mutations';
import { useSaveClipPD } from '/src/api/mutations/useSaveClipPD';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ClipsState } from '/src/clips/ClipsState';
import { initRS } from '/src/resourceStates/ResourceState';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { usePropsRef } from '/src/utils/hooks/usePropsRef';
import { getIds, lookUp } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  playlist: PlaylistT;
};

export const useClipsState = (props: PropsT) => {
  const moveClipsToTrash = initRS(useMoveClipsToTrash());
  const moveClipsToPlaylist = initRS(useMoveClipsToPlaylist());
  const saveClip = initRS(useSaveClip());
  const saveClipPD = initRS(useSaveClipPD());
  const saveClipOrdering = initRS(useSaveClipOrdering());

  const propsRef = usePropsRef(props);

  const clipsState = useBuilder<ClipsState>(() => {
    return new ClipsState({
      //
      moveClipsToTrash: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          name: 'moveClipsToTrash',
          states: { updating: [...clips, moveClipsToTrash] },
          promise: moveClipsToTrash.mutateAsync({
            playlistId: propsRef.current?.playlist.id,
            playlistSlug: propsRef.current?.playlist.slug,
            clipIds: ids,
          } as MoveClipsToTrashArgsT),
        }).result;
      }),
      //
      saveClip: (values: ObjT) => {
        return trackPromise({
          name: 'saveClip',
          states: { updating: [saveClip] },
          promise: saveClip
            .mutateAsync({
              playlistId: propsRef.current?.playlist.id,
              playlistSlug: propsRef.current?.playlist.slug,
              clipForm: values.clipForm,
              parentClipId: clipsState.clipsCtr.addition.parentId,
            } as SaveClipArgsT)
            .then(() => {
              return values.clipForm;
            }),
        }).result;
      },
      //
      saveClipPD: (values: ObjT) => {
        return trackPromise({
          name: 'saveClipPD',
          states: { updating: [saveClipPD] },
          promise: saveClipPD
            .mutateAsync({
              clipId: clipsState.clipsCtr.highlight.item?.id,
              clipSlug: clipsState.clipsCtr.highlight.item?.slug,
              clipPDForm: values.clipPDForm,
            } as SaveClipPDArgsT)
            .then(() => {
              return values.clipPDForm;
            }),
        }).result;
      },
      //
      saveClipOrdering: (clips: ClipT[]) => {
        return trackPromise({
          name: 'saveClipOrdering',
          states: { updating: [saveClipOrdering] },
          promise: saveClipOrdering.mutateAsync({
            playlistSlug: propsRef.current?.playlist.slug,
            playlistId: propsRef.current?.playlist.id,
            clipIds: getIds(clips),
          } as SaveClipOrderingArgsT),
        }).result;
      },
      //
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        playlistSlug: string,
        copy: boolean
      ) => {
        return trackPromise({
          name: 'moveClipsToPlaylist',
          states: { updating: [...clips, moveClipsToPlaylist] },
          promise: moveClipsToPlaylist.mutateAsync({
            srcPlaylistId: propsRef.current?.playlist.id,
            srcPlaylistSlug: propsRef.current?.playlist.slug,
            destPlaylistId: playlistId,
            destPlaylistSlug: playlistSlug,
            clipIds: getIds(clips),
            copy,
          } as MoveClipsToPlaylistArgsT),
        }).result;
      },
    });
  }) as ClipsState;

  React.useEffect(() => () => clipsState.destroy(), [clipsState]);

  return {
    clipsState,
    moveClipsToTrash,
    moveClipsToPlaylist,
    saveClip,
    saveClipOrdering,
  };
};
