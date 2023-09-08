import { isLoading } from 'mobx-resource-states';
import { ClipT } from '/src/api/types/ClipT';
import { getRouteParams } from '/src/routes/utils/getRouteParams';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const useIsClipNotFound = () => {
  const clipNotFoundFlag = useBuilder(() => new DelayedFlag());

  const isClipNotFound = (clip: ClipT | undefined) => {
    clipNotFoundFlag.update(
      !clip && !isLoading(clip) && getRouteParams().clipSlug !== 'new-clip'
    );
    return clipNotFoundFlag.flag;
  };
  return { isClipNotFound };
};
