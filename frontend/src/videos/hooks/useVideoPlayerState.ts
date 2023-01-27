import urlParser from 'js-video-url-parser';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { VideoController } from 'src/videos/VideoController';
import { VideoIFrame } from 'src/videos/VideoIFrame';

type PropsT = {
  parentElmRef: any;
  clip: ClipT;
};

export class VideoPlayerState {
  _parentElmRef: any;

  @observable clip: ClipT;
  @observable videoIFrame?: VideoIFrame;
  @observable panelWidth: number = 100;
  @observable videoUrlProps: VideoUrlPropsT;
  @observable isFullVideoWidth: boolean = false;
  @observable videoController = new VideoController();

  @action setPanelWidth(x: number) {
    this.panelWidth = x;
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  @computed get ready() {
    return this.videoController.ready;
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
    this.clip = props.clip;
    this._parentElmRef = props.parentElmRef;
    this.videoUrlProps = urlParser.parse(props.clip.url!) as VideoUrlPropsT;
    makeObservable(this);
  }
}

export const useVideoPlayerState = (props: PropsT): VideoPlayerState => {
  const [videoPlayerState] = React.useState(() => new VideoPlayerState(props));

  React.useEffect(() => {
    return () => videoPlayerState.destroy();
  }, [videoPlayerState]);

  return videoPlayerState;
};

// videoIFrame.focusParentDiv();
