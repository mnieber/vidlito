import urlParser from 'js-video-url-parser';
import _debounce from 'lodash/debounce';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import * as R from 'ramda';
import React from 'react';
import { ClipT } from 'src/api/types/ClipT';
import { VideoUrlPropsT } from 'src/api/types/VideoUrlPropsT';
import { heightToWidth } from 'src/videos/utils/aspectRatio';
import { VideoController } from 'src/videos/VideoController';
import { VideoIFrame } from 'src/videos/VideoIFrame';

type PropsT = {
  parentElmRef: any;
  clip: ClipT;
};

export class VideoPlayerState {
  _parentElmRef: any;
  _setPanelWidth: Function;

  @observable clip: ClipT;
  @observable videoIFrame?: VideoIFrame;
  @observable panelWidth: number = 100;
  @observable videoUrlProps: VideoUrlPropsT;
  @observable isFullVideoWidth: boolean = false;
  @observable videoController = new VideoController();

  @action setPanelWidth(x: number) {
    this._setPanelWidth(x);
  }

  @action setIsFullVideoWidth(x: boolean) {
    this.isFullVideoWidth = x;
  }

  @computed get videoWidth() {
    return _getVideoWidth(this.isFullVideoWidth, this.panelWidth) ?? 100;
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
    this._setPanelWidth = _debounce((width: number) => {
      if (!R.isNil(width)) {
        runInAction(() => {
          this.panelWidth = width;
        });
      }
    }, 1000);

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

function _getVideoWidth(isFullVideoWidth: boolean, panelWidth: number) {
  const maxWidthDictatedByScreen = heightToWidth(window.screen.height * 16) / 9;
  const maxVideoWidth = isFullVideoWidth ? 1200 : 800;
  const videoPanelWidth = panelWidth ?? 100;

  const videoWidth = Math.min(
    maxVideoWidth,
    videoPanelWidth - 10,
    maxWidthDictatedByScreen
  );
  return videoWidth;
}

//     videoIFrame.focusParentDiv();
