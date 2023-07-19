import { isLoading } from '/src/api/getState';
import { ClipT } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const useIsClipNotFound = () => {
  const clipNotFoundFlag = useBuilder(() => new DelayedFlag());

  const isClipNotFound = (
    playlist: PlaylistT | undefined,
    clip: ClipT | undefined
  ) => {
    clipNotFoundFlag.update(
      !clip && !!playlist?.clipSet.length && !isLoading(clip)
    );
    return clipNotFoundFlag.flag;
  };
  return { isClipNotFound };
};
