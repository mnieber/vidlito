import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { EndpointData } from 'src/api/EndpointData';

export const symbolRS = Symbol('ResourceState');

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';

export class ResourceState {
  @observable _state: ResourceStateT = undefined;

  @action setState(state: ResourceStateT) {
    this._state = state;
  }

  getState() {
    return this._state;
  }

  isUpdating() {
    return this._state === 'updating';
  }

  isLoading() {
    return this._state === 'loading';
  }

  isReady() {
    return this._state === 'ready';
  }

  isAvailable() {
    // When in doubt (this.isUndefined) assume that the data is available.
    return this.isReady() || this.isUpdating() || this.isUndefined();
  }

  isUndefined() {
    return this._state === undefined;
  }

  constructor() {
    makeObservable(this);
  }
}

export const isUpdating = (resource: any) =>
  resource !== null && getRS(resource).isUpdating();
export const isLoading = (resource: any) =>
  resource === null || getRS(resource).isLoading();
export const isReady = (resource: any) => getRS(resource).isReady();
export const isAvailable = (resource: any) =>
  !!resource && getRS(resource).isAvailable();
export const isUndefined = (resource: any) => getRS(resource).isUndefined();

export const setState = (resource: any, state: ResourceStateT) =>
  getRS(resource).setState(state);
export const setToUpdating = (resource: any) => setState(resource, 'updating');
export const setToLoading = (resource: any) => setState(resource, 'loading');
export const setToReady = (resource: any) => setState(resource, 'ready');
export const setToUndefined = (resource: any) => setState(resource, undefined);

export const getRS = (resource: any): ResourceState => {
  if (R.isNil(resource)) {
    debugger;
  }

  const rs = resource[symbolRS];
  if (R.isNil(rs)) {
    debugger;
    throw new Error('ResourceState not initialized');
  }
  return rs;
};

export const peekRS = (resource: any) => {
  return resource[symbolRS];
};

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = new ResourceState();
    resource[symbolRS].setState(state ?? 'undefined');
  }
  return resource;
};

export const getState = (resource: any) => {
  return resource[symbolRS].getState();
};

export type RegOptionsT = {
  loading?: any[];
  updating?: any[];
};

export const reg = (options: RegOptionsT) => (resource: any) => {
  if (resource === null) {
    return resource;
  }

  let state: ResourceStateT = undefined;

  for (const source of options.loading ?? []) {
    const isRS = source instanceof ResourceState;
    if (
      (isRS && source.isLoading()) ||
      (!isRS && source !== undefined && isLoading(source))
    ) {
      if (R.isNil(resource)) return null;
      state = 'loading';
      break;
    }
  }

  if (!state) {
    for (const source of options.updating ?? []) {
      const isRS = source instanceof ResourceState;
      if (
        (isRS && source.isUpdating()) ||
        (!isRS && source !== undefined && isUpdating(source))
      ) {
        state = 'updating';
        break;
      }
    }
  }

  if (R.isNil(resource)) return resource;

  initRS(resource);
  if (state !== undefined) {
    getRS(resource).setState(state);
  }

  return resource;
};

export const maybe = (
  endpoint: EndpointData,
  state: ResourceStateT,
  flag: boolean
) => {
  const rs = new ResourceState();
  if (endpoint.status === 'loading' || endpoint.status === 'idle') {
    flag && rs.setState(state);
  } else {
    flag && rs.setState('ready');
    !flag && rs.setState(undefined);
  }
  return rs;
};
