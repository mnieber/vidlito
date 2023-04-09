import { action, makeObservable, observable } from 'mobx';

export class Settings {
  @observable playlistSlug?: string;
  @observable ownerUserName?: string;

  @action setPlaylistOwnerAndSlug(ownerUserName: string, playlistSlug: string) {
    this.ownerUserName = ownerUserName;
    this.playlistSlug = playlistSlug;
  }
  constructor() {
    makeObservable(this);
  }
}
