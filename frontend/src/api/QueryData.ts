import { action, makeObservable, observable } from 'mobx';
import { EndpointData } from 'src/api/EndpointData';
import { log } from 'src/utils/logging';
import { ObjT } from 'src/utils/types';

export class QueryData extends EndpointData {
  query: ObjT = {};
  data: ObjT | undefined = undefined;

  public toString = (): string => {
    return `QueryData`;
  };

  log(label: string) {
    console.group(label);
    log('Props', {
      id: this.id,
      debugLabel: this.debugLabel ?? 'Unknown',
      data: this.data,
      status: this.status,
    });
    console.groupEnd();
  }

  clear = () => {
    this.data = undefined;
    this.status = 'idle';
  };

  constructor() {
    super();
    makeObservable(this, {
      data: observable,
      clear: action,
    });
  }
}
