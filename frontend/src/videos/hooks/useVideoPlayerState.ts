import urlParser from 'js-video-url-parser';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { heightToWidth } from 'src/videos/utils/aspectRatio';
import { VideoController } from 'src/videos/VideoController';
import { VideoIFrame } from 'src/videos/VideoIFrame';

export type VideoPlayerStateT = {
  videoController: VideoController;
  videoWidth: number;
  videoUrlProps: VideoUrlPropsT;
  clip: ClipT;
  isFullVideoWidth: boolean;
  setIsFullVideoWidth: (isFullVideoWidth: boolean) => void;
  setPanelWidth: (x: number) => void;
  setPlayer: (player: any) => void;
};

type PropsT = {
  parentElmRef: any;
  clip: ClipT;
};

export const useVideoPlayerState = (props: PropsT): VideoPlayerStateT => {
  const [panelWidth, setPanelWidth] = React.useState(100);
  const [isFullVideoWidth, setIsFullVideoWidth] = React.useState(false);
  const [videoController] = React.useState(() => new VideoController());
  const [videoIFrame, setVideoIFrame] = React.useState<VideoIFrame | undefined>(
    undefined
  );

  React.useEffect(() => {
    return () => {
      videoIFrame?.unregister();
    };
  }, [videoIFrame]);

  const setPlayer = (player: any) => {
    videoController.setPlayer(player);
    if (player) {
      if (videoIFrame) {
        videoIFrame.unregister();
      }
      setVideoIFrame(
        new VideoIFrame(props.parentElmRef.current, player.getIframe())
      );
    }
  };

  const videoUrlProps: VideoUrlPropsT = urlParser.parse(
    props.clip.url!
  ) as VideoUrlPropsT;

  return {
    videoController,
    videoUrlProps,
    videoWidth: _getVideoWidth(isFullVideoWidth, panelWidth),
    isFullVideoWidth,
    clip: props.clip,
    setIsFullVideoWidth,
    setPanelWidth,
    setPlayer,
  };
};

function _getVideoWidth(isFullVideoWidth: boolean, panelWidth: number) {
  const maxWidthDictatedByScreen = heightToWidth(window.screen.height * 16) / 9;
  const maxVideoWidth = isFullVideoWidth ? 1200 : 800;
  const videoPanelWidth = panelWidth ?? 100;

  const videoWidth = Math.min(
    maxVideoWidth,
    videoPanelWidth - 10,
    maxWidthDictatedByScreen
  );
  return videoWidth;
}

//     videoIFrame.focusParentDiv();
