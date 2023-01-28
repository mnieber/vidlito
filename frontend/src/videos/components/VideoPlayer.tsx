// @ts-ignore
import * as React from 'react';
import { YoutubePlayer } from 'src/videos/components/YoutubePlayer';
import { VideoPlayerState } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = {
  videoPlayerState: VideoPlayerState;
  width: number;
  className?: any;
};

export function VideoPlayer(props: PropsT) {
  const internalPlayer =
    props.videoPlayerState.videoUrlProps?.provider === 'youtube' ? (
      <div className={props.className}>
        <YoutubePlayer
          key={props.videoPlayerState.clip.url!} // yes, we need this
          videoPlayerState={props.videoPlayerState}
          width={props.width}
        />
      </div>
    ) : (
      <React.Fragment />
    );

  return internalPlayer;
}
