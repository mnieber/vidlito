import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import * as React from 'react';
import YouTube from 'react-youtube';
import { VideoPlayerState } from '/src/videos/VideoPlayerState';
import { widthToHeight } from '/src/videos/utils/aspectRatio';

type PropsT = {
  videoPlayerState: VideoPlayerState;
  videoPlayerParentElm: any;
  width: number;
};

export const YoutubePlayer = observer((props: PropsT) => {
  const params = props.videoPlayerState.videoUrlProps.params;
  const videoController = props.videoPlayerState.videoController;
  const videoUrlProps = props.videoPlayerState.videoUrlProps;

  const startTime = !R.isNil(props.videoPlayerState.startTimeMs)
    ? (props.videoPlayerState.startTimeMs || 0) / 1000
    : params && !R.isNil(params.start)
    ? params.start
    : null;

  React.useEffect(() => {
    if (props.videoPlayerState.url) {
      videoController.pauseAt(startTime || 0);
    }
  }, [props.videoPlayerState.url, startTime, videoController]);

  const opts = {
    height: widthToHeight(props.width),
    width: props.width,
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
        props.videoPlayerState.setPlayer(player, props.videoPlayerParentElm);
        videoController.pauseAt(startTime || 0);
      }, 100);
    });
  };

  const _onPlay = () => {
    videoController.togglePlay(true);
  };
  const _onPause = () => {
    videoController.togglePlay(false);
  };

  return (
    <YouTube
      videoId={videoUrlProps.id}
      // @ts-ignore
      opts={opts}
      onReady={_onReady}
      onStateChange={(x) => videoController.setPlayerReady()}
      onPlay={_onPlay}
      onPause={_onPause}
    />
  );
});
