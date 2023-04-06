import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { flags } from 'src/app/flags';
import { log } from 'src/utils/logging';

export const symbolRS = Symbol('ResourceState');

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';
export type SourceT = [() => boolean, string];

export class ResourceState {
  name?: string = undefined;
  locked?: boolean = undefined;
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

  lock(flag: boolean) {
    this.locked = flag;
  }

  get value() {
    let state: ResourceStateT = 'ready';
    const isLogging = this.name && flags.logResourceStates;
    isLogging && console.group(`Getting resource state for ${this.name}`);

    if (state === 'ready') {
      for (const source of this.loaders) {
        const [loader, name] = source;

        if (loader()) {
          isLogging && log(`Loading triggered by: ${name}`);
          state = 'loading';
          break;
        }
      }
    }

    if (state === 'ready') {
      for (const source of this.updaters) {
        const [updater, name] = source;

        if (updater()) {
          isLogging && log(`Updating triggered by: ${name}`);
          state = 'updating';
          break;
        }
      }
    }

    if (state === 'ready') {
      isLogging && log('Resource is ready');
    }

    isLogging && console.groupEnd();
    return state;
  }

  constructor() {
    makeObservable(this, {
      addLoader: action,
      addUpdater: action,
      loaders: observable,
      lock: action,
      locked: observable,
      removeLoader: action,
      removeUpdater: action,
      updaters: observable,
      value: computed,
    });
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
  updaterName: string,
  options: { lock?: boolean } = {}
) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.addUpdater(updaterRes, updaterName);
    if (options.lock) {
      rs.lock(true);
    }
  }
  return () => removeUpdater(resources, updaterName, { unlock: options.lock });
};

export const removeUpdater = (
  resources: any[],
  name: string,
  options: { unlock?: boolean } = {}
) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.removeUpdater(name);
    if (options.unlock) {
      rs.lock(false);
    }
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

export const graftResourceStates = ({
  resources,
  prevResources,
  getKey,
  rsName,
}: {
  resources: any[];
  prevResources?: any[];
  getKey?: Function;
  rsName?: string;
}) => {
  for (const resource of resources) {
    const key = getKey ? getKey(resource) : resource.id;

    initRS(resource);
    if (rsName) {
      getRS(resource).name = `${rsName}_${key}`;
    }

    if (prevResources) {
      const previousResource = prevResources.find(
        (r) => key === (getKey ? getKey(r) : r.id)
      );
      if (previousResource) {
        resource[symbolRS] = previousResource[symbolRS];
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

  return resource === null ? 'loading' : resource[symbolRS].value;
};

export const isLocked = (resource: any) => resource && getRS(resource)?.locked;
export const isUpdating = (resource: any) => getState(resource) === 'updating';
export const isLoading = (resource: any) => getState(resource) === 'loading';
export const isReady = (resource: any) => getState(resource) === 'ready';
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource) === undefined;
