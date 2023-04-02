import { makeAutoObservable } from 'mobx';
import * as R from 'ramda';

export const symbolRS = Symbol('ResourceState');

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';

export class ResourceState {
  state: ResourceStateT = undefined;

  constructor() {
    makeAutoObservable(this);
  }
}

export const isUpdating = (resource: any) => getState(resource) === 'updating';
export const isLoading = (resource: any) => getState(resource) === 'loading';
export const isReady = (resource: any) => getState(resource) === 'ready';
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource) === undefined;

export const setState = (resource: any, state: ResourceStateT) => {
  resource[symbolRS].state = state;
};

export const setToUpdating = (resource: any) => setState(resource, 'updating');
export const setToLoading = (resource: any) => setState(resource, 'loading');
export const setToReady = (resource: any) => setState(resource, 'ready');
export const setToUndefined = (resource: any) => setState(resource, undefined);

export const getState = (resource: any): ResourceStateT | undefined => {
  if (!!resource && !resource[symbolRS]) {
    debugger;
  }

  return resource === null
    ? 'loading'
    : resource
    ? resource[symbolRS].state ?? undefined
    : undefined;
};

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = state ?? undefined;
  }
  return resource;
};

export const initAllRS = (
  resources: any[],
  previousResources?: any[],
  getKey?: Function
) => {
  for (const resource of resources) {
    const key = getKey ? getKey(resource) : resource.id;

    if (R.isNil(resource[symbolRS])) {
      resource[symbolRS] = new ResourceState();
    }

    if (previousResources) {
      const previousResource = previousResources.find(
        (r) => key === (getKey ? getKey(r) : r.id)
      );
      if (previousResource) {
        resource[symbolRS].state = previousResource[symbolRS].state;
      }
    }
  }
  return resources;
};
