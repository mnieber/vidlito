import { nullResource, symbolRS } from './ResourceState';

export const getState = <StateT = string>(
  resource: any
): StateT | undefined => {
  if (!!resource && !resource[symbolRS]) {
    debugger;
  }

  if (resource === undefined) {
    return undefined;
  }

  return resource === nullResource ? 'loading' : resource[symbolRS].value;
};

export const isUpdating = (resource: any) => getState(resource) === 'updating';
export const isLoading = (resource: any) => getState(resource) === 'loading';
export const isReady = (resource: any) => getState(resource) === 'ready';
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource) === undefined;
