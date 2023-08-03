import { action } from 'mobx';
import React from 'react';
import { Highlight, topOfTheList } from 'skandha-facets';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useGetClipPd,
  useMoveClipsToPlaylist,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import {
  DeleteClipsArgsT,
  MoveClipsToPlaylistArgsT,
  SaveClipArgsT,
  SaveClipPdArgsT,
  useDeleteClips,
} from '/src/api/mutations';
import { useSaveClipPd } from '/src/api/mutations/useSaveClipPd';
import { createClipPd } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ClipsState } from '/src/clips/ClipsState';
import { navHandler } from '/src/navHandler/NavHandler';
import { initRS } from '/src/resourceStates/ResourceState';
import { trackPromise } from '/src/resourceStates/trackPromise';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { getIds, lookUp } from '/src/utils/ids';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  // We're using a get function here so that MobX can react to changes in the
  // playlist. This works as as long as the get function returns a computed value.
  getPlaylist: () => PlaylistT | undefined;
};

export const useClipsState = (props: PropsT) => {
  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
  const params = navHandler.getParams();

  const clipsHighlightRef = React.useRef<Highlight | undefined>();
  const getClipSlug = () =>
    clipsHighlightRef.current?.item?.slug ?? params.clipSlug;

  // Mutations
  const deleteClips = initRS(useDeleteClips());
  const moveClipsToTrash = initRS(useMoveClipsToTrash());
  const moveClipsToPlaylist = initRS(useMoveClipsToPlaylist());
  const saveClip = initRS(useSaveClip());
  const saveClipPd = initRS(useSaveClipPd());
  const saveClipOrdering = initRS(useSaveClipOrdering());

  // Queries
  const isGetClipPdEnabled = () =>
    !!getClipSlug() && getClipSlug() !== 'new-clip';
  const getClipPd = useObservableQuery(
    useGetClipPd(
      { clipSlug: getClipSlug() },
      { enabled: isGetClipPdEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getClipPd' }
  );

  const clipsState = useBuilder<ClipsState>(() => {
    return new ClipsState({
      //
      getClips: () => {
        return graftResourceStatesFromMemo({
          resources: props.getPlaylist()?.clipSet ?? [],
        });
      },
      //
      getClipPd: () => {
        return getClipPd.data?.clipPd ?? createClipPd();
      },
      //
      deleteClips: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          name: 'deleteClips',
          states: { updating: [...clips, deleteClips] },
          promise: deleteClips.mutateAsync({
            clipIds: ids,
          } as DeleteClipsArgsT),
        }).result;
      }),
      //
      moveClipsToTrash: action((ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          name: 'moveClipsToTrash',
          states: { updating: [...clips, moveClipsToTrash] },
          promise: moveClipsToTrash.mutateAsync({
            playlistId: props.getPlaylist()?.id,
            playlistSlug: props.getPlaylist()?.slug,
            clipIds: ids,
          } as MoveClipsToTrashArgsT),
        }).result;
      }),
      //
      saveClip: (values: ObjT) => {
        const parentClipId = clipsState.clipsCtr.addition.parentId;
        return trackPromise({
          name: 'saveClip',
          states: { updating: [saveClip] },
          promise: saveClip
            .mutateAsync({
              playlistId: props.getPlaylist()?.id,
              clipForm: values.clipForm,
              parentClipId:
                parentClipId === topOfTheList ? undefined : parentClipId,
            } as SaveClipArgsT)
            .then(() => {
              return values.clipForm;
            }),
        }).result;
      },
      //
      saveClipPd: (values: ObjT) => {
        return trackPromise({
          name: 'saveClipPd',
          states: { updating: [saveClipPd] },
          promise: saveClipPd
            .mutateAsync({
              clipId: clipsState.clipsCtr.highlight.item?.id,
              clipSlug: clipsState.clipsCtr.highlight.item?.slug,
              clipPdForm: values.clipPdForm,
            } as SaveClipPdArgsT)
            .then(() => {
              return values.clipPdForm;
            }),
        }).result;
      },
      //
      saveClipOrdering: (clips: ClipT[]) => {
        return trackPromise({
          name: 'saveClipOrdering',
          states: { updating: [saveClipOrdering] },
          promise: saveClipOrdering.mutateAsync({
            playlistSlug: props.getPlaylist()?.slug,
            playlistId: props.getPlaylist()?.id,
            clipIds: getIds(clips),
          } as SaveClipOrderingArgsT),
        }).result;
      },
      //
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        copy: boolean
      ) => {
        return trackPromise({
          name: 'moveClipsToPlaylist',
          states: { updating: [...clips, moveClipsToPlaylist] },
          promise: moveClipsToPlaylist.mutateAsync({
            srcPlaylistId: props.getPlaylist()?.id,
            destPlaylistId: playlistId,
            clipIds: getIds(clips),
            copy,
          } as MoveClipsToPlaylistArgsT),
        }).result;
      },
    });
  }) as ClipsState;
  clipsHighlightRef.current = clipsState.clipsCtr.highlight;

  React.useEffect(() => () => clipsState.destroy(), [clipsState]);

  return {
    clipsState,
    moveClipsToTrash,
    moveClipsToPlaylist,
    saveClip,
    saveClipOrdering,
    isGetClipPdLoading: () => isGetClipPdEnabled() && isQueryLoading(getClipPd),
    isGetClipPdUpdating: () =>
      isGetClipPdEnabled() && isQueryUpdating(getClipPd),
  };
};
