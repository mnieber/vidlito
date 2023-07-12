import { action } from 'mobx';
import React from 'react';
import { Highlight } from 'skandha-facets';
import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import {
  MoveClipsToTrashArgsT,
  SaveClipOrderingArgsT,
  useGetClipPD,
  useMoveClipsToPlaylist,
  useMoveClipsToTrash,
  useSaveClip,
  useSaveClipOrdering,
} from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import {
  MoveClipsToPlaylistArgsT,
  SaveClipArgsT,
  SaveClipPDArgsT,
} from '/src/api/mutations';
import { useSaveClipPD } from '/src/api/mutations/useSaveClipPD';
import { createClipPD } from '/src/api/types/ClipPDT';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ClipsState } from '/src/clips/ClipsState';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
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
  const params = useNavHandlerParams();

  const clipsHighlightRef = React.useRef<Highlight | undefined>();
  const getClipSlug = () =>
    clipsHighlightRef.current?.item?.slug ?? params.clipSlug;

  // Mutations
  const moveClipsToTrash = initRS(useMoveClipsToTrash());
  const moveClipsToPlaylist = initRS(useMoveClipsToPlaylist());
  const saveClip = initRS(useSaveClip());
  const saveClipPD = initRS(useSaveClipPD());
  const saveClipOrdering = initRS(useSaveClipOrdering());

  // Queries
  const isGetClipPDEnabled = () =>
    !!getClipSlug() && getClipSlug() !== 'new-clip';
  const getClipPD = useObservableQuery(
    useGetClipPD(
      { clipSlug: getClipSlug() },
      { enabled: isGetClipPDEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getClipPD' }
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
      getClipPD: () => {
        return getClipPD.data?.clipPD ?? createClipPD();
      },
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
        return trackPromise({
          name: 'saveClip',
          states: { updating: [saveClip] },
          promise: saveClip
            .mutateAsync({
              playlistId: props.getPlaylist()?.id,
              playlistSlug: props.getPlaylist()?.slug,
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
        playlistSlug: string,
        copy: boolean
      ) => {
        return trackPromise({
          name: 'moveClipsToPlaylist',
          states: { updating: [...clips, moveClipsToPlaylist] },
          promise: moveClipsToPlaylist.mutateAsync({
            srcPlaylistId: props.getPlaylist()?.id,
            srcPlaylistSlug: props.getPlaylist()?.slug,
            destPlaylistId: playlistId,
            destPlaylistSlug: playlistSlug,
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
    isGetClipPDLoading: () => isGetClipPDEnabled() && isQueryLoading(getClipPD),
    isGetClipPDUpdating: () =>
      isGetClipPDEnabled() && isQueryUpdating(getClipPD),
  };
};
