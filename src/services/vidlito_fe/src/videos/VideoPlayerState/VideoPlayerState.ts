import urlParser from 'js-video-url-parser';
import { action, computed, makeObservable, observable } from 'mobx';
import * as Skandha from 'skandha';
import { VideoUrlPropsT } from '/src/api/types/VideoUrlPropsT';
import { VideoController } from '/src/videos/VideoController';

export type PropsT = {};

export class VideoPlayerState {
  @observable url: string = '';
  @observable startTimeMs: number = 0;
  @observable videoController = new VideoController();

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

  @computed get ready() {
    return this.videoController.ready;
  }

  @computed get videoUrlProps(): VideoUrlPropsT {
    return urlParser.parse(this.url!) as VideoUrlPropsT;
  }

  @action setPlayer(player: any) {
    this.videoController.setPlayer(player);
  }

  getSummary() {
    return {};
  }

  destroy() {
    this.videoController.dispose();
    Skandha.cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    makeObservable(this);
  }
}
