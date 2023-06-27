import urlParser from 'js-video-url-parser';
import { action, computed, makeObservable, observable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import { VideoUrlPropsT } from '/src/api/types/VideoUrlPropsT';
import { VideoController } from '/src/videos/VideoController';
import { VideoIFrame } from '/src/videos/VideoIFrame';

export type PropsT = {};

export class VideoPlayerState {
  @observable url: string = '';
  @observable startTimeMs: number = 0;
  @observable videoIFrame?: VideoIFrame;
  @observable panelWidth: number | undefined = undefined;
  @observable isFullVideoWidth: boolean = false;
  @observable videoController = new VideoController();

  @action setPanelWidth(x: number | undefined) {
    this.panelWidth = x;
  }

  @action setUrl(url: string, startTimeMs: number) {
    if (this.url && this.url !== url) {
      this.videoController.togglePlay(false);
    }
    if (this.url !== url) {
      this.url = url;
      this.videoController.reset();
    }
    this.startTimeMs = startTimeMs;
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

  @action setPlayer(player: any, parentElm: any) {
    this.videoController.setPlayer(player);
    if (player) {
      if (this.videoIFrame) {
        this.videoIFrame.unregister();
      }
      this.videoIFrame = new VideoIFrame(parentElm, player.getIframe());
    }
  }

  getSummary() {
    return {};
  }

  destroy() {
    this.videoIFrame?.unregister();
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    makeObservable(this);
  }
}
