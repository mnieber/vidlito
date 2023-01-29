import urlParser from 'js-video-url-parser';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { VideoController } from 'src/videos/VideoController';
import { VideoIFrame } from 'src/videos/VideoIFrame';

type PropsT = {
  parentElmRef: any;
  url: string;
  startTimeMs: number;
};

export class VideoPlayerState {
  _parentElmRef: any;

  @observable url: string = '';
  @observable startTimeMs: number = 0;
  @observable videoIFrame?: VideoIFrame;
  @observable panelWidth: number = 100;
  @observable isFullVideoWidth: boolean = false;
  @observable videoController = new VideoController();

  @action setPanelWidth(x: number) {
    this.panelWidth = x;
  }

  @action setUrl(url: string, startTimeMs: number) {
    this.url = url;
    this.startTimeMs = startTimeMs;
    this.videoController.reset();
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  @computed get ready() {
    return this.videoController.ready;
  }

  @computed get videoUrlProps(): VideoUrlPropsT {
    return urlParser.parse(this.url!) as VideoUrlPropsT;
  }

  @action setPlayer(player: any) {
    this.videoController.setPlayer(player);
    if (player) {
      if (this.videoIFrame) {
        this.videoIFrame.unregister();
      }
      this.videoIFrame = new VideoIFrame(
        this._parentElmRef.current,
        player.getIframe()
      );
    }
  }

  destroy() {
    this.videoIFrame?.unregister();
  }

  constructor(props: PropsT) {
    this.setUrl(props.url, props.startTimeMs);
    this._parentElmRef = props.parentElmRef;
    makeObservable(this);
  }
}

export const useVideoPlayerState = (props: PropsT): VideoPlayerState => {
  const [videoPlayerState] = React.useState(() => new VideoPlayerState(props));

  React.useEffect(() => {
    videoPlayerState.setUrl(props.url, props.startTimeMs);
  }, [videoPlayerState, props.url, props.startTimeMs]);

  React.useEffect(() => {
    return () => videoPlayerState.destroy();
  }, [videoPlayerState]);

  return videoPlayerState;
};

// videoIFrame.focusParentDiv();
