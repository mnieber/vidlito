import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

export type PropsT = {};

export class VideoController {
  @observable isPlaying: boolean = false;
  @observable player: any;
  @observable ready: boolean = false;

  // We use _player to allow non-observer access to the player via getPlayer
  _player: any;
  _pauseAt: number = -1;
  _disposeAutoRun: Function = () => {};

  @action setPlayer(player: any) {
    this.player = this._player = player;

    this._disposeAutoRun();
    this._disposeAutoRun = autorun(() => this._updatePlayer());
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
    const notPlaying = -1;
    if (
      this.player &&
      this.player.getPlayerState() === notPlaying &&
      this._pauseAt >= 0
    ) {
      try {
        setTimeout(() => {
          runInAction(() => (this.ready = true));
          this.player.pauseVideo();
        }, 500);
      } catch {}
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
