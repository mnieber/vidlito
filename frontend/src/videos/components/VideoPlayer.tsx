// @ts-ignore
import * as React from 'react';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';
import { YoutubePlayer } from '/src/videos/components/YoutubePlayer';

type PropsT = {
  videoPlayerState: VideoPlayerState;
  videoPlayerParentElm: any;
  width: number;
  className?: any;
};

export function VideoPlayer(props: PropsT) {
  const internalPlayer =
    props.videoPlayerState.videoUrlProps?.provider === 'youtube' ? (
      <div className={props.className}>
        <YoutubePlayer
          videoPlayerState={props.videoPlayerState}
          videoPlayerParentElm={props.videoPlayerParentElm}
          width={props.width}
        />
      </div>
    ) : (
      <React.Fragment />
    );

  return internalPlayer;
}
