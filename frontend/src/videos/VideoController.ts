import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

export type PropsT = {};

export type PlayerT = {
  seekTo: (t: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
  getDuration: () => number;
  setPlaybackRate: (r: number) => void;
  getCurrentTime: () => number;
  getMediaReferenceTime: () => number;
};

export class VideoController {
  @observable isPlaying: boolean = false;
  @observable player?: PlayerT;
  @observable ready: boolean = false;

  // The following properties control the loop feature
  @observable isLoopEnabled: boolean = false;
  @observable loopStart: number = 0;
  @observable loopEnd: number = 0;
  _loopCheckInterval: any = null;

  // We use _player to allow non-observer access to the player via getPlayer
  _player?: PlayerT;
  _pauseAt: number = -1;
  _disposeAutoRun: Function = () => {};

  @action setLoop(enabled: boolean, start: number, end: number) {
    this.isLoopEnabled = enabled;
    this.loopStart = start;
    this.loopEnd = end;

    // clear any existing loop checking
    if (this._loopCheckInterval) {
      clearInterval(this._loopCheckInterval);
      this._loopCheckInterval = null;
    }

    // if loop is enabled, start checking
    if (enabled) {
      this._loopCheckInterval = setInterval(() => this._checkLoop(), 100); // Check every 100ms
    }
  }

  _checkLoop() {
    if (this.isLoopEnabled && this.player && this.isPlaying) {
      const currentTime = this.player.getCurrentTime();
      const altLoopEnd = this.player.getDuration() - 1;
      const loopEnd =
        this.loopEnd === Infinity ? altLoopEnd : this.loopEnd / 1000;

      if (currentTime >= loopEnd) {
        this.player.seekTo(this.loopStart / 1000);
      }
    }
  }

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

  // Make sure to clear any remaining interval on object destruction
  dispose() {
    if (this._loopCheckInterval) {
      clearInterval(this._loopCheckInterval);
      this._loopCheckInterval = null;
    }

    this._disposeAutoRun();
  }

  constructor() {
    makeObservable(this);
  }
}

function _isYoutubePlaying(player: any) {
  return [1, 3].includes(player.getPlayerState());
}
