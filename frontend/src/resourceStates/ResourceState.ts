import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { flags } from 'src/app/flags';
import { log } from 'src/utils/logging';

export const symbolRS = Symbol('ResourceState');

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';
export type SourceT = [() => boolean, string];

export class ResourceState {
  name?: string = undefined;
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

export const getRS = (resource: any) => {
  return resource[symbolRS];
};

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = state ?? new ResourceState();
  }
  return resource;
};
