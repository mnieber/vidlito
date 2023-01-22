import { runInAction } from 'mobx';
import * as R from 'ramda';
import * as React from 'react';
import YouTube from 'react-youtube';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { VideoControllerState } from 'src/videos/VideoControllerState';

type PropsT = {
  videoUrlProps: VideoUrlPropsT;
  videoController: VideoControllerState;
  videoWidth: number;
  setIFrame: Function;
};

export function YoutubePlayer(props: PropsT) {
  const params = props.videoUrlProps.params;
  const { videoController } = props;
  const video = videoController.video;
  const url = video ? video.url : '';

  const startTime =
    video && !R.isNil(video.startTimeMs)
      ? (video.startTimeMs || 0) / 1000
      : params && !R.isNil(params.start)
      ? params.start
      : null;

  React.useEffect(() => {
    if (url) {
      videoController.pauseAt(startTime || 0);
    }
  }, [url, startTime, videoController]);

  const opts = {
    height: (props.videoWidth * 9) / 16,
    width: props.videoWidth,
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
        videoController.setPlayer(player);
        videoController.pauseAt(startTime || 0);
      }, 100);
    });
    props.setIFrame(player.getIframe());
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
      videoId={props.videoUrlProps.id}
      // @ts-ignore
      opts={opts}
      onReady={_onReady}
      onStateChange={(x) => videoController.setPlayerState(x.data)}
      onPlay={_onPlay}
      onPause={_onPause}
    />
  );
}
