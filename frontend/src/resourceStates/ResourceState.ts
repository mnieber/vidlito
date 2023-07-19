import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { flags } from '/src/app/flags';
import { log } from '/src/utils/logging';

export const symbolRS = Symbol('ResourceState');

// The loadingResource is used when we know that a resource exists (e.g. on the server)
// but we don't have a reference to it yet. Typically, it is used for any resource that is
// being loaded from the server.
export const loadingResource = null;

export type ConditionT = () => boolean | undefined;

export type SourceT = {
  state: string;
  condition: ConditionT;
  name: string;
  data: any;
};

export class ResourceState {
  name?: string = undefined;
  sources: SourceT[] = [];

  addSource(source: SourceT) {
    for (let i = 0; i < this.sources.length; i++) {
      if (
        this.sources[i].state === source.state &&
        this.sources[i].name === source.name
      ) {
        this.sources[i] = source;
        return;
      }
    }
    this.sources.push(source);
  }

  removeSource(state: string, name: string) {
    for (let i = 0; i < this.sources.length; i++) {
      if (this.sources[i].state === state && this.sources[i].name === name) {
        this.sources.splice(i, 1);
        return;
      }
    }
  }

  get value() {
    const result: string[] = [];

    const isLogging = this.name && flags.logResourceStates;
    isLogging && console.group(`Getting resource state for ${this.name}`);

    for (const source of this.sources) {
      if (source.condition()) {
        const state = source.state;
        isLogging && log(`State ${state} triggered by: ${source.name}`);
        if (!result.includes(state)) {
          result.push(state);
        }
      }
    }

    if (!result.length) {
      isLogging && log('Resource is ready');
    }

    isLogging && console.groupEnd();
    return result;
  }

  constructor() {
    makeObservable(this, {
      addSource: action,
      removeSource: action,
      sources: observable,
      value: computed,
    });
  }
}

export const getRS = (resource: any): ResourceState => {
  return resource[symbolRS];
};

export const initRS = (resource: any) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = new ResourceState();
  }
  return resource;
};

export const shareRS = (sourceResource: any, destResource: any) => {
  destResource[symbolRS] = sourceResource[symbolRS];
};
