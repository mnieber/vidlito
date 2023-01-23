import { runInAction } from 'mobx';
import * as R from 'ramda';
import * as React from 'react';
import YouTube from 'react-youtube';
import { VideoPlayerStateT } from 'src/videos/hooks/useVideoPlayerState';

type PropsT = {
  videoPlayerState: VideoPlayerStateT;
};

export function YoutubePlayer(props: PropsT) {
  const params = props.videoPlayerState.videoUrlProps.params;
  const { videoController, clip, videoUrlProps, videoWidth } =
    props.videoPlayerState;

  const startTime =
    clip && !R.isNil(clip.startTimeMs)
      ? (clip.startTimeMs || 0) / 1000
      : params && !R.isNil(params.start)
      ? params.start
      : null;

  React.useEffect(() => {
    if (clip.url) {
      videoController.pauseAt(startTime || 0);
    }
  }, [clip.url, startTime, videoController]);

  const opts = {
    height: (videoWidth * 9) / 16,
    width: videoWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      rel: 0,
    },
  };

  const _onReady = (event: any) => {
    const player = event.target;
    runInAction(() => {
      setTimeout(() => {
        props.videoPlayerState.setPlayer(player);
        videoController.pauseAt(startTime || 0);
      }, 100);
    });
  };

  const _onPlay = () => {
    runInAction(() => {
      videoController.isPlaying = true;
    });
  };
  const _onPause = () => {
    runInAction(() => {
      videoController.isPlaying = false;
    });
  };

  return (
    <YouTube
      videoId={videoUrlProps.id}
      // @ts-ignore
      opts={opts}
      onReady={_onReady}
      onStateChange={(x) => videoController.setPlayerState(x.data)}
      onPlay={_onPlay}
      onPause={_onPause}
    />
  );
}
