import { splitKeyHandlerKeys } from '/src/utils';
import { VideoController } from '/src/videos/VideoController';

export const createVideoKeyHandlers = (
  videoController: VideoController,
  startTime?: number,
  endTime?: number
) => {
  const player = videoController.player;
  if (!player) {
    return {};
  }

  return splitKeyHandlerKeys({
    'ctrl+space': () => videoController.togglePlay(),
    'ctrl+enter': () => videoController.togglePlay(),
    'ctrl+shift+1': () => player.setPlaybackRate(0.25),
    'ctrl+shift+2': () => player.setPlaybackRate(0.5),
    'ctrl+shift+3': () => player.setPlaybackRate(0.75),
    'ctrl+shift+4': () => player.setPlaybackRate(1),
    'ctrl+shift+5': () => player.setPlaybackRate(1.25),
    'ctrl+shift+6': () => player.setPlaybackRate(1.5),
    'ctrl+shift+7': () => player.setPlaybackRate(1.75),
    'ctrl+shift+8': () => player.setPlaybackRate(2),
    'ctrl+down': () => player.seekTo(player.getCurrentTime() - 0.6),
    'ctrl+shift+down': () => player.seekTo(player.getCurrentTime() - 0.15),
    'ctrl+up': () => player.seekTo(player.getCurrentTime() + 0.5),
    'ctrl+shift+up': () => player.seekTo(player.getCurrentTime() + 0.1),
    'ctrl+shift+home;ctrl+h': () => player.seekTo(startTime),
    'ctrl+shift+end;ctrl+shift+h': () => player.seekTo(endTime),
  });
};
