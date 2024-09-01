import { trackPromise } from 'mobx-resource-states';
import React from 'react';
import { Highlight, topOfTheList } from 'skandha-facets';
import { useParams } from 'wouter';
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
import {
  DeleteClipsArgsT,
  MoveClipsToPlaylistArgsT,
  SaveClipArgsT,
  SaveClipPdArgsT,
  useDeleteClips,
} from '/src/api/endpoints/mutations';
import { useSaveClipPd } from '/src/api/endpoints/mutations/useSaveClipPd';
import { useObservableQuery } from '/src/api/hooks';
import { createClipPd } from '/src/api/types/ClipPdT';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ClipsState } from '/src/clips/ClipsState';
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
  const params = useParams() as ObjT;

  const clipsHighlightRef = React.useRef<Highlight | undefined>();
  const getClipSlug = () =>
    clipsHighlightRef.current?.item?.slug ?? params.clipSlug;

  // Mutations
  const deleteClips = useDeleteClips();
  const moveClipsToTrash = useMoveClipsToTrash();
  const moveClipsToPlaylist = useMoveClipsToPlaylist();
  const saveClip = useSaveClip();
  const saveClipPd = useSaveClipPd();
  const saveClipOrdering = useSaveClipOrdering();

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
      deleteClips: (ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          name: 'deleteClips',
          states: { updating: clips },
          promise: deleteClips.mutateAsync({
            clipIds: ids,
          } as DeleteClipsArgsT),
        }).result;
      },
      //
      moveClipsToTrash: (ids: string[]) => {
        const clips = lookUp(ids, clipsState.clipsCtr.store.itemById);
        return trackPromise({
          name: 'moveClipsToTrash',
          states: { updating: clips },
          promise: moveClipsToTrash.mutateAsync({
            playlistId: props.getPlaylist()?.id,
            playlistSlug: props.getPlaylist()?.slug,
            clipIds: ids,
          } as MoveClipsToTrashArgsT),
        }).result;
      },
      //
      saveClip: (values: ObjT) => {
        const parentClipId = clipsState.clipsCtr.addition.parentId;
        return saveClip
          .mutateAsync({
            playlistId: props.getPlaylist()?.id,
            playlistSlug: props.getPlaylist()?.slug,
            clipForm: values.clipForm,
            parentClipId:
              parentClipId === topOfTheList ? undefined : parentClipId,
          } as SaveClipArgsT)
          .then((response) => {
            return response.clip;
          });
      },
      //
      saveClipPd: (values: ObjT) => {
        return saveClipPd
          .mutateAsync({
            clipId: clipsState.clipsCtr.highlight.item?.id,
            clipSlug: clipsState.clipsCtr.highlight.item?.slug,
            clipPdForm: values.clipPdForm,
          } as SaveClipPdArgsT)
          .then(() => {
            return values.clipPdForm;
          });
      },
      //
      saveClipOrdering: (clips: ClipT[]) => {
        return saveClipOrdering.mutateAsync({
          playlistSlug: props.getPlaylist()?.slug,
          playlistId: props.getPlaylist()?.id,
          clipIds: getIds(clips),
        } as SaveClipOrderingArgsT);
      },
      //
      moveClipsToPlaylist: (
        clips: ClipT[],
        playlistId: string,
        copy: boolean
      ) => {
        return trackPromise({
          name: 'moveClipsToPlaylist',
          states: { updating: clips },
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
