import { alwaysLoading, getRS, initRS, SourceT } from 'src/api/ResourceState';

export type PropsT = {
  resource: any;
  name: string;
  isAlwaysLoading?: boolean;
  loaders?: SourceT[];
  updaters?: SourceT[];
};

export const withSources = (props: PropsT) => {
  const rs = getRS(initRS(props.resource ?? {}));

  if (props.isAlwaysLoading ?? false) {
    rs.addLoader(alwaysLoading, 'alwaysLoading');
  } else {
    rs.removeLoader('alwaysLoading');
  }

  for (const [loader, name] of props.loaders ?? []) {
    if (loader) {
      rs.addLoader(loader, name);
    } else {
      rs.removeLoader(name);
    }
  }
  for (const [updater, name] of props.updaters ?? []) {
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
