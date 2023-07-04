import { action, makeObservable, observable } from 'mobx';
import { createUUID } from '/src/utils/ids';
import { log } from '/src/utils/logging';
import { ObjT } from '/src/utils/types';

export type QueryDataT = ObjT | undefined;

export interface IQuery {
  data: QueryDataT;
  status: string;
}

export class ObservableQuery implements IQuery {
  data: QueryDataT = undefined;
  id: string = '';
  status: string = 'idle';
  debugLabel?: string = '';

  public toString = (): string => {
    return `ObservableQuery`;
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
    this.id = createUUID();
    makeObservable(this, {
      status: observable,
      data: observable,
      clear: action,
    });
  }
}

export const isQueryLoading = (query: IQuery) => {
  return query.status === 'loading' && !query.data;
};

export const isQueryUpdating = (query: IQuery) => {
  return query.status === 'loading' && !!query.data;
};
