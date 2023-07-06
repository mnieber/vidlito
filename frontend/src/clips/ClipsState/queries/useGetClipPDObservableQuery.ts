import { isQueryLoading, isQueryUpdating } from '/src/api/ObservableQuery';
import { useGetClipPD } from '/src/api/endpoints';
import { useObservableQuery } from '/src/api/hooks';
import { ClipsState } from '/src/clips/ClipsState';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';

export function useGetClipPDObservableQuery(clipsState: ClipsState) {
  const params = useNavHandlerParams();
  const getClipSlug = () =>
    clipsState.clipsCtr.highlight.item?.slug ?? params.clipSlug;
  const isGetClipPDEnabled = () => getClipSlug() !== 'new-clip';

  const getClipPD = useObservableQuery(
    useGetClipPD(
      { clipSlug: getClipSlug() },
      { enabled: isGetClipPDEnabled() }
    ),
    { fetchAsLoad: true, debugLabel: 'getClipPD' }
  );

  return {
    getClipPDData: () => getClipPD.data?.clipPD,
    isGetClipPDLoading: () => isGetClipPDEnabled() && isQueryLoading(getClipPD),
    isGetClipPDUpdating: () =>
      isGetClipPDEnabled() && isQueryUpdating(getClipPD),
  };
}
