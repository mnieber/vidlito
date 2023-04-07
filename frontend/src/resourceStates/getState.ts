import { ResourceStateT, symbolRS } from './ResourceState';

export const getState = (resource: any): ResourceStateT | undefined => {
  if (!!resource && !resource[symbolRS]) {
    debugger;
  }

  if (resource === undefined) {
    return undefined;
  }

  return resource === null ? 'loading' : resource[symbolRS].value;
};

export const isUpdating = (resource: any) => getState(resource) === 'updating';
export const isLoading = (resource: any) => getState(resource) === 'loading';
export const isReady = (resource: any) => getState(resource) === 'ready';
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource) === undefined;
