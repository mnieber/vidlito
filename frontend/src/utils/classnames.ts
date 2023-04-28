import classnames from 'classnames';

export const cn = classnames;

export const d = (x: string): string => {
  return process.env.NODE_ENV === 'development' ? x.toString() : '';
};

export const cln =
  (label: string, ...intrinsicArgs: any[]) =>
  (...args: any[]) => {
    return process.env.NODE_ENV !== 'development' && label.endsWith('__')
      ? cn(...(intrinsicArgs ?? []), ...args)
      : cn(label, ...(intrinsicArgs ?? []), ...args);
  };
