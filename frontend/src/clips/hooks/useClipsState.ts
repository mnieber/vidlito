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
import { MoveClipsToPlaylistArgsT, SaveClipArgsT } from '/src/api/mutations';
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
  const saveClipOrdering = initRS(useSaveClipOrdering());

  const propsRef = usePropsRef(props);

  const clipsState = useBuilder<ClipsState>(() => {
    return new ClipsState({
      moveClipsToTrash: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);

        return trackPromise({
          name: 'moveClipsToTrash',
          //
          promise: moveClipsToTrash.mutateAsync({
            playlistId: propsRef.current?.playlist.id,
            playlistSlug: propsRef.current?.playlist.slug,
            clipIds: ids,
          } as MoveClipsToTrashArgsT),
          //
          states: {
            updating: [...clips, moveClipsToTrash],
          },
        }).result;
      }),
      saveClip: (values: ObjT) => {
        return trackPromise({
          name: 'saveClip',
          //
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
          //
          states: {
            updating: [saveClip],
          },
        }).result;
      },
      saveClipOrdering: (clips: ClipT[]) => {
        return trackPromise({
          name: 'saveClipOrdering',
          //
          promise: saveClipOrdering.mutateAsync({
            playlistSlug: propsRef.current?.playlist.slug,
            playlistId: propsRef.current?.playlist.id,
            clipIds: getIds(clips),
          } as SaveClipOrderingArgsT),
          //
          states: {
            updating: [saveClipOrdering],
          },
        }).result;
      },
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        playlistSlug: string,
        copy: boolean
      ) => {
        return trackPromise({
          name: 'moveClipsToPlaylist',
          //
          promise: moveClipsToPlaylist.mutateAsync({
            srcPlaylistId: propsRef.current?.playlist.id,
            srcPlaylistSlug: propsRef.current?.playlist.slug,
            destPlaylistId: playlistId,
            destPlaylistSlug: playlistSlug,
            clipIds: getIds(clips),
            copy,
          } as MoveClipsToPlaylistArgsT),
          //
          states: {
            updating: [...clips, moveClipsToPlaylist],
          },
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
