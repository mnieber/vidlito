import React from 'react';
import { useResize } from '/src/frames/hooks/useResize';
import { VideoPlayerState } from '/src/videos/VideoPlayerState/VideoPlayerState';
import { getVideoWidth } from '/src/videos/utils/aspectRatio';

export type PropsT = {
  videoPlayerState: VideoPlayerState;
  leftSidebarWidth: number;
};

export const useOnResizeDashboard = (props: PropsT) => {
  const { panelWidth, onResize } = useResize({});
  const maxVideoWidth = props.videoPlayerState.isFullVideoWidth ? 1200 : 800;
  const nextPanelWidth = getVideoWidth(
    maxVideoWidth,
    (panelWidth ?? window.innerWidth) - 150 - props.leftSidebarWidth
  );

  React.useEffect(() => {
    props.videoPlayerState.setPanelWidth(nextPanelWidth);
  }, [props.videoPlayerState, nextPanelWidth]);

  return {
    onResize,
  };
};
