import { isLoading } from 'mobx-resource-states';
import { useParams } from 'wouter';
import { ClipT } from '/src/api/types/ClipT';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { useBuilder } from '/src/utils/hooks/useBuilder';
import { ObjT } from '/src/utils/types';

export const useIsClipNotFound = () => {
  const params = useParams() as ObjT;
  const clipNotFoundFlag = useBuilder(() => new DelayedFlag());

  const isClipNotFound = (clip: ClipT | undefined) => {
    clipNotFoundFlag.update(
      !clip && !isLoading(clip) && params.clipSlug !== 'new-clip'
    );
    return clipNotFoundFlag.flag;
  };
  return { isClipNotFound };
};
