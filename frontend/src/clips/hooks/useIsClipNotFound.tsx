import { isLoading } from '/src/api/getState';
import { ClipT } from '/src/api/types/ClipT';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const useIsClipNotFound = () => {
  const clipNotFoundFlag = useBuilder(() => new DelayedFlag());

  const isClipNotFound = (clip: ClipT | undefined) => {
    clipNotFoundFlag.update(!clip && !isLoading(clip));
    return clipNotFoundFlag.flag;
  };
  return { isClipNotFound };
};
