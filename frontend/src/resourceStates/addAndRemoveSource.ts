import { getRS } from './ResourceState';

export const addUpdater = (
  resources: any[],
  updaterRes: any,
  updaterName: string
) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.addUpdater(updaterRes, updaterName);
  }
  return () => removeUpdater(resources, updaterName);
};

export const removeUpdater = (resources: any[], name: string) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.removeUpdater(name);
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
