import { getRS, initRS, symbolRS } from './ResourceState';

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
