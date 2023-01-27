// @ts-ignore
import * as React from 'react';
import { YoutubePlayer } from 'src/videos/components/YoutubePlayer';
import { VideoPlayerState } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = {
  videoPlayerState: VideoPlayerState;
};

export function VideoPlayer(props: PropsT) {
  const internalPlayer =
    props.videoPlayerState.videoUrlProps?.provider === 'youtube' ? (
      <YoutubePlayer
        key={props.videoPlayerState.clip.url!} // yes, we need this
        videoPlayerState={props.videoPlayerState}
      />
    ) : (
      <React.Fragment />
    );

  return internalPlayer;
}
