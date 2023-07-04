import { getRS, initRS } from './ResourceState';
import { shareRS } from '/src/resourceStates/ResourceState';

export type ArgsT = {
  resources: any[];
  prevResources?: any[];
  keyProp?: string;
  rsName?: string;
};

export const graftResourceStates = (args: ArgsT) => {
  const keyProp = args.keyProp ?? 'id';

  for (const resource of args.resources) {
    const key = resource[keyProp];
    initRS(resource);
    if (args.rsName) {
      getRS(resource).name = `${args.rsName}_${key}`;
    }

    if (args.prevResources) {
      const previousResource = args.prevResources.find(
        (r) => key === r[keyProp]
      );
      if (previousResource) {
        shareRS(previousResource, resource);
      }
    }
  }
  return args.resources;
};
