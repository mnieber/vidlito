import { getRS } from './ResourceState';

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
