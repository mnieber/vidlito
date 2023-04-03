import { makeObservable, observable } from 'mobx';
import { createUUID } from 'src/utils/ids';

export class EndpointData {
  id: string = '';
  status: string = 'idle';
  debugLabel?: string = '';

  constructor() {
    this.id = createUUID();
    makeObservable(this, {
      status: observable,
    });
  }
}
