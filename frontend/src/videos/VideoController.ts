import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

export type PropsT = {};

export type PlayerT = {
  seekTo: (t: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  setPlaybackRate: (r: number) => void;
  getCurrentTime: () => number;
  getMediaReferenceTime: () => number;
};

export class VideoController {
  @observable isPlaying: boolean = false;
  @observable player?: PlayerT;
  @observable ready: boolean = false;

  // We use _player to allow non-observer access to the player via getPlayer
  _player?: PlayerT;
  _pauseAt: number = -1;
  _disposeAutoRun: Function = () => {};

  @action setPlayer(player: PlayerT) {
    this.player = this._player = player;

    this._disposeAutoRun();
    this._disposeAutoRun = autorun(() => this._updatePlayer());
  }

  @action reset() {
    this.player = undefined;
    this.ready = false;
  }

  @action togglePlay(play?: boolean) {
    this.isPlaying = play ?? !this.isPlaying;
  }

  getPlayer() {
    return this._player;
  }

  pauseAt(t: number) {
    if (this.player) {
      try {
        this._pauseAt = t;
        this.player.seekTo(t);
      } catch {}
    }
  }

  setPlayerReady() {
    const pausePlayer = () => {
      try {
        setTimeout(() => {
          if (this.player) {
            this.player.pauseVideo();
          } else {
            pausePlayer();
          }
        }, 250);
      } catch {}
    };

    const notPlaying = -1;
    if (
      this.player &&
      this.player.getPlayerState() === notPlaying &&
      this._pauseAt >= 0
    ) {
      runInAction(() => (this.ready = true));
      pausePlayer();
    }
  }

  _updatePlayer() {
    if (this.player && this.isPlaying !== _isYoutubePlaying(this.player)) {
      try {
        if (this.isPlaying) {
          this.player.playVideo();
        } else {
          this.player.pauseVideo();
        }
      } catch {}
    }
  }

  constructor() {
    makeObservable(this);
  }
}

function _isYoutubePlaying(player: any) {
  return [1, 3].includes(player.getPlayerState());
}
