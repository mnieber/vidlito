// @ts-ignore
import urlParser from 'js-video-url-parser';
import * as React from 'react';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { YoutubePlayer } from 'src/videos/components/YoutubePlayer';
import { listenToIFrame } from 'src/videos/utils/listenToIFrame';
import { VideoControllerState } from 'src/videos/VideoControllerState';

type PropsT = {
  videoController: VideoControllerState;
  videoWidth: number;
  parentDivId: string;
};

export function VideoPlayer(props: PropsT) {
  const video = props.videoController.video;
  const url = (video ? video.url : '') || '';
  const videoUrlProps: VideoUrlPropsT = urlParser.parse(url) as VideoUrlPropsT;

  const internalPlayer =
    videoUrlProps && videoUrlProps.provider === 'youtube' ? (
      <YoutubePlayer
        key={url} // yes, we need this
        videoUrlProps={videoUrlProps}
        videoController={props.videoController}
        videoWidth={props.videoWidth}
        setIFrame={(iframe: any) => {
          listenToIFrame(props.parentDivId, iframe);
        }}
      />
    ) : (
      <React.Fragment />
    );

  return internalPlayer;
}
