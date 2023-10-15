import React from 'react';
import { VideoController } from '/src/videos/VideoController';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';

export const VideoPlayerContext = React.createContext<any>(null);

export const useVideoPlayerContext = () => {
  const context = React.useContext(VideoPlayerContext);
  if (!context) {
    throw new Error(
      'useVideoPlayerContext must be used within a VideoPlayerContext.Provider'
    );
  }
  return context;
};

export const videoPlayerCtx = {
  videoPlayerState: [
    useVideoPlayerContext,
    'videoPlayerState',
  ] as any as VideoPlayerState,
  videoController: [
    useVideoPlayerContext,
    'videoController',
  ] as any as VideoController,
};
