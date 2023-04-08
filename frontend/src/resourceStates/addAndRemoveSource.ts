import { ResourceStateT } from 'src/resourceStates/ResourceState';
import { getRS } from './ResourceState';

export const addSource = (
  resources: any[],
  state: ResourceStateT,
  condition: any,
  name: string,
  data?: any
) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.addSource({ state, condition, name, data });
  }
  return () => removeSource(resources, state, name);
};

export const removeSource = (
  resources: any[],
  state: ResourceStateT,
  name: string
) => {
  for (const resource of resources) {
    const rs = getRS(resource);
    rs.removeSource(state, name);
  }
};
