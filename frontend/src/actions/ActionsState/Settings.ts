import { action, makeObservable, observable } from 'mobx';

export class Settings {
  @observable playlistSlug?: string;

  @action setPlaylistSlug(playlistSlug: string) {
    this.playlistSlug = playlistSlug;
  }

  constructor() {
    makeObservable(this);
  }
}
