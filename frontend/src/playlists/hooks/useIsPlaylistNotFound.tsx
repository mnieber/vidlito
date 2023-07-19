import { isLoading } from '/src/api/getState';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { DelayedFlag } from '/src/utils/DelayedFlag';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export const useIsPlaylistNotFound = () => {
  const playlistNotFoundFlag = useBuilder(() => new DelayedFlag());

  const isPlaylistNotFound = (playlist: PlaylistT | undefined) => {
    playlistNotFoundFlag.update(!playlist && !isLoading(playlist));
    return playlistNotFoundFlag.flag;
  };
  return { isPlaylistNotFound };
};
