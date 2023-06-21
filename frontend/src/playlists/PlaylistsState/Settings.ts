import { action, makeObservable } from 'mobx';

export class Settings {
  @action setPlaylistOwnerAndSlug(
    ownerUserName: string,
    playlistSlug: string
  ) {}
  constructor() {
    makeObservable(this);
  }
}
