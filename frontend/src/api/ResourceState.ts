import { makeAutoObservable } from 'mobx';
import * as R from 'ramda';
import { EndpointData } from 'src/api/EndpointData';

export const symbolRS = Symbol('ResourceState');

export const alwaysLoading = makeAutoObservable({});

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';
export type SourceT = [any, string];

export class ResourceState {
  loaders: SourceT[] = [];
  updaters: SourceT[] = [];

  addLoader(loader: any, name: string) {
    _addSource([loader, name], this.loaders);
  }

  removeLoader(name: string) {
    _removeSource(name, this.loaders);
  }

  addUpdater(updater: any, name: string) {
    _addSource([updater, name], this.updaters);
  }

  removeUpdater(name: string) {
    _removeSource(name, this.updaters);
  }

  get value() {
    for (const source of this.loaders) {
      const loader = source[0];

      // If the loader is a query or a mutation...
      if (loader instanceof EndpointData) {
        if (loader.status === 'loading') {
          return 'loading';
        }
      }
      // If the loader is a resource...
      else {
        if (loader === alwaysLoading || getState(loader) !== 'ready') {
          return 'loading';
        }
      }
    }

    for (const source of this.updaters) {
      const updater = source[0];

      if (updater instanceof EndpointData) {
        if (updater.status === 'loading') {
          return 'updating';
        }
      } else {
        if (getState(updater) !== 'ready') {
          return 'updating';
        }
      }
    }

    return 'ready';
  }

  constructor() {
    makeAutoObservable(this);
  }
}

function _addSource(newSource: SourceT, sources: SourceT[]) {
  for (let i = 0; i < sources.length; i++) {
    if (sources[i][1] === newSource[1]) {
      if (sources[i][0] !== newSource[0]) {
        sources[i] = newSource;
      }
      return;
    }
  }
  sources.push(newSource);
}

function _removeSource(name: string, sources: SourceT[]) {
  for (let i = 0; i < sources.length; i++) {
    if (sources[i][1] === name) {
      sources.splice(i, 1);
      return;
    }
  }
}

export const addUpdater = (
  resources: any[],
  updaterRes: any,
  updaterName: string
) => {
  for (const resource of resources) {
    getRS(resource).addUpdater(updaterRes, updaterName);
  }
  return () => removeUpdater(resources, updaterName);
};

export const removeUpdater = (resources: any[], name: string) => {
  for (const resource of resources) {
    getRS(resource).removeUpdater(name);
  }
};

export const addLoader = (
  resources: any[],
  loaderRes: any,
  loaderName: string
) => {
  for (const resource of resources) {
    getRS(resource).addLoader(loaderRes, loaderName);
  }
};

export const removeLoader = (resources: any[], name: string) => {
  for (const resource of resources) {
    getRS(resource).removeLoader(name);
  }
};

export const getRS = (resource: any) => {
  return resource[symbolRS];
};

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = state ?? new ResourceState();
  }
  return resource;
};

export const graftResourceStates = (
  resources: any[],
  previousResources?: any[],
  getKey?: Function
) => {
  for (const resource of resources) {
    initRS(resource);

    if (previousResources) {
      const key = getKey ? getKey(resource) : resource.id;
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

export const getState = (resource: any): ResourceStateT | undefined => {
  if (!!resource && !resource[symbolRS]) {
    debugger;
  }

  if (resource === undefined) {
    return undefined;
  }

  return resource === null ? 'loading' : resource[symbolRS].state;
};

export const isUpdating = (resource: any) => getState(resource) === 'updating';
export const isLoading = (resource: any) => getState(resource) === 'loading';
export const isReady = (resource: any) => getState(resource) === 'ready';
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource) === undefined;
