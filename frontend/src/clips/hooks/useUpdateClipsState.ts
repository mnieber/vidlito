import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useGetClipPD } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { createClipPD } from '/src/api/types/ClipPDT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { ClipsState } from '/src/clips/ClipsState/ClipsState';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useGraftResourceStatesFromMemo } from '/src/utils/hooks/useGraftResourceStatesFromMemo';
import { log } from '/src/utils/logging';

export type PropsT = {
  clipsState: ClipsState;
  getPlaylist: () => PlaylistT | undefined;
};

export const useUpdateClipsState = (props: PropsT) => {
  const graftResourceStatesFromMemo = useGraftResourceStatesFromMemo({});
  const params = useNavHandlerParams();

  const getClipsData = () => props.getPlaylist()?.clipSet ?? [];

  const getClipSlug = () =>
    props.clipsState.clipsCtr.highlight.item?.slug ?? params.clipSlug;
  const isGetClipPDEnabled = () => getClipSlug() !== 'new-clip';

  const getClipPD = useObservableQuery(
    useGetClipPD(
      { clipSlug: getClipSlug() },
      { enabled: isGetClipPDEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getClipPD' }
  );

  useUpdateStateReaction({
    getInputs: () => ({
      clips: getClipsData(),
      clipPD: getClipPD.data?.clipPD,
    }),
    updateState: (inputs) => {
      const clips = graftResourceStatesFromMemo({ resources: inputs.clips });
      props.clipsState.clipsCtr.store.items = clips ?? [];
      props.clipsState.clipPDCtr.store.clipPD = inputs.clipPD ?? createClipPD();
    },
    logState: () => {
      log('ClipsState updated', props.clipsState.getSummary());
    },
  });

  return {
    isGetClipPDLoading: () => isGetClipPDEnabled() && isQueryLoading(getClipPD),
    isGetClipPDUpdating: () =>
      isGetClipPDEnabled() && isQueryUpdating(getClipPD),
  };
};
