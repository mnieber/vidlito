import { loadingResource, symbolRS } from '/src/resourceStates/ResourceState';

export const getState = <StateT = string>(resource: any): StateT[] => {
  if (!!resource && !resource[symbolRS]) {
    debugger;
  }

  if (resource === undefined) {
    return [];
  }

  return resource === loadingResource ? ['loading'] : resource[symbolRS].value;
};

export const isUpdating = (resource: any) =>
  getState(resource).includes('updating');
export const isNotFound = (resource: any) =>
  getState(resource).includes('notFound');
export const isLoading = (resource: any) =>
  getState(resource).includes('loading');
export const isReady = (resource: any) => {
  const state = getState(resource);
  return (
    resource &&
    !state.includes('loading') &&
    !state.includes('updating') &&
    !state.includes('notFound')
  );
};
export const isUndefined = (resource: any) =>
  resource === undefined || getState(resource).length === 0;
