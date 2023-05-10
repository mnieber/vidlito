import * as R from 'ramda';
import { getRS } from '/src/resourceStates';

export type ArgsT = {
  states?: {
    [state: string]: any[];
  };
  name: string;
};

export const removeSource = (args: ArgsT) => {
  for (const pair of R.toPairs(args.states ?? {})) {
    const state = pair[0];
    const resources = pair[1];
    for (const resource of resources) {
      const rs = getRS(resource);
      rs.removeSource(state, args.name);
    }
  }
};
