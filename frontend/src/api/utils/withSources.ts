import { getRS, initRS } from 'src/resourceStates';
import { ResourceStateT } from 'src/resourceStates/ResourceState';

export type OptionsT = {
  resource: any;
  resourceName?: string;
};

export type SourceSpecT =
  | [ResourceStateT, () => boolean | undefined, string, any]
  | [ResourceStateT, () => boolean | undefined, string];

export const withSources = (
  options: OptionsT,
  ...sourceSpecs: SourceSpecT[]
) => {
  const rs = getRS(initRS(options.resource ?? {}));
  rs.name = options.resourceName ?? rs.name;

  for (const sourceSpec of sourceSpecs) {
    const [state, condition, name, data] = sourceSpec;
    if (condition !== undefined) {
      rs.addSource({ state, condition, name, data });
    } else {
      rs.removeSource(state, name);
    }
  }

  if (!options.resource) {
    return rs.value === 'loading' ? null : undefined;
  }

  return options.resource;
};
