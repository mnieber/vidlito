import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { flags } from 'src/app/flags';
import { log } from 'src/utils/logging';

export const symbolRS = Symbol('ResourceState');

export type ResourceStateT = undefined | 'loading' | 'updating' | 'ready';

export type SourceT = {
  state: ResourceStateT;
  condition: () => boolean | undefined;
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

  removeSource(state: ResourceStateT, name: string) {
    for (let i = 0; i < this.sources.length; i++) {
      if (this.sources[i].state === state && this.sources[i].name === name) {
        this.sources.splice(i, 1);
        return;
      }
    }
  }

  get value() {
    let state: ResourceStateT = 'ready';
    const isLogging = this.name && flags.logResourceStates;
    isLogging && console.group(`Getting resource state for ${this.name}`);

    for (const source of this.sources) {
      if (source.condition()) {
        isLogging && log(`State ${source.state} triggered by: ${source.name}`);
        state = source.state;
        break;
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

export const initRS = (resource: any, state?: ResourceStateT) => {
  if (resource && R.isNil(resource[symbolRS])) {
    resource[symbolRS] = state ?? new ResourceState();
  }
  return resource;
};
