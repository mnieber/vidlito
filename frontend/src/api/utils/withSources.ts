import { getRS, initRS, SourceT } from 'src/api/ResourceState';

export type PropsT = {
  resource: any;
  resourceName?: string;
  isAlwaysLoading?: boolean;
  loading?: SourceT[];
  updating?: SourceT[];
};

export const withSources = (props: PropsT) => {
  const rs = getRS(initRS(props.resource ?? {}));
  rs.name = props.resourceName ?? rs.name;

  for (const [loader, name] of props.loading ?? []) {
    if (loader) {
      rs.addLoader(loader, name);
    } else {
      rs.removeLoader(name);
    }
  }
  for (const [updater, name] of props.updating ?? []) {
    if (updater) {
      rs.addUpdater(updater, name);
    } else {
      rs.removeLoader(name);
    }
  }

  if (!props.resource) {
    return rs.value === 'loading' ? null : undefined;
  }

  return props.resource;
};
