import { action, autorun, makeObservable } from 'mobx';
import { data, input } from 'skandha';
import { ClipT } from 'src/api/types/ClipT';

export type PropsT = {};

export class VideoControllerState {
  @input video?: ClipT;
  @data isPlaying: boolean = false;
  @data player: any;
  // We use _player to allow non-observer access to the player via getPlayer
  _player: any;
  _pauseAt: number = -1;
  _disposeAutoRun: Function = () => {};

  @action setPlayer(x: any) {
    this.player = this._player = x;
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

  setPlayerState(x: number) {
    const notPlaying = -1;
    if (
      this.player &&
      this.player.getPlayerState() === notPlaying &&
      this._pauseAt >= 0
    ) {
      try {
        setTimeout(() => this.player.pauseVideo(), 500);
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
