import classnames from 'classnames';

export const cn = (label: string, ...args: any[]) => {
  return import.meta.env.PROD && label.endsWith('__')
    ? classnames(...args)
    : classnames(label, ...args);
};

type ArgsT = {
  label?: string;
  component?: any;
  adhoc?: any;
};

export const foo = (args: ArgsT) => {
  if (args.label && !import.meta.env.PROD) {
    return classnames(
      args.label,
      ...(args.component ?? {}),
      ...(args.adhoc ?? [])
    );
  }

  return classnames(...(args.component ?? {}), ...(args.adhoc ?? []));
};
