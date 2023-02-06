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

  isUndefined() {
    return this._state === undefined;
  }

  constructor(state?: ResourceStateT) {
    this.setState(state);
    makeObservable(this);
  }
}

export const isUpdating = (resource: any) =>
  getRS(resource)?.isUpdating() ?? false;
export const isLoading = (resource: any) =>
  resource === null || (getRS(resource)?.isLoading() ?? false);
export const isReady = (resource: any) => getRS(resource)?.isReady() ?? false;
export const isUndefined = (resource: any) =>
  resource === undefined || (getRS(resource)?.isUndefined() ?? true);

export const setState = (resource: any, state: ResourceStateT) => {
  const rs = getRS(resource);
  if (!rs) {
    throw new Error('ResourceState not found');
  }
  rs.setState(state);
};

export const setToUpdating = (resource: any) => setState(resource, 'updating');
export const setToLoading = (resource: any) => setState(resource, 'loading');
export const setToReady = (resource: any) => setState(resource, 'ready');
export const setToUndefined = (resource: any) => setState(resource, undefined);

export const getRS = (resource: any): ResourceState | undefined => {
  if (R.isNil(resource)) {
    return undefined;
  }
  const rs = resource[symbolRS];
  if (R.isNil(rs)) {
    return undefined;
  }
  return rs;
};

export const peekRS = (resource: any) => {
  return resource[symbolRS];
};

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = new ResourceState();
    resource[symbolRS].setState(state ?? undefined);
  }
  return resource;
};

export const getState = (resource: any) => {
  return getRS(resource)?.getState() ?? undefined;
};

export type RegOptionsT = {
  loading?: any[];
  updating?: any[];
};

export const cloneAndSetState = (resource: any, options: RegOptionsT) => {
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

  if (R.isNil(resource)) {
    return state === 'loading' ? null : undefined;
  }

  const result = Array.isArray(resource) ? [...resource] : { ...resource };
  const resourceState = (resource as any)[symbolRS]?.getState();
  // When we set the result RS, then a "loading" or "updating" state from the
  // input "resource" takes precedence.
  (result as any)[symbolRS] = new ResourceState(
    resourceState === 'loading' || resourceState === 'updating'
      ? resourceState
      : state
  );
  return result;
};

export const maybe = (
  endpoint: EndpointData,
  state: ResourceStateT,
  flag: boolean
) => {
  const rs = new ResourceState();
  if (
    endpoint.status === 'loading' ||
    (state === 'loading' && endpoint.status === 'idle')
  ) {
    flag && rs.setState(state);
  } else {
    flag && rs.setState('ready');
    !flag && rs.setState(undefined);
  }
  return rs;
};
