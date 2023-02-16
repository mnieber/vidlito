import { makeObservable } from 'mobx';

export class Settings {
  constructor() {
    false && makeObservable(this);
  }
}
