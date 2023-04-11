import { getRS, initRS, nullResource } from 'src/resourceStates';

export type OptionsT = {
  resource: any;
  resourceName?: string;
};

export type SourceSpecT =
  | [string, () => boolean | undefined, string, any]
  | [string, () => boolean | undefined, string];

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
    return rs.value === 'loading' ? nullResource : undefined;
  }

  return options.resource;
};
