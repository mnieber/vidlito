import classnames from 'classnames';

export const d = (x: string): string => {
  return process.env.NODE_ENV === 'development' ? x.toString() : '';
};

export const cn = (label: string, ...args: any[]) => {
  return process.env.NODE_ENV !== 'development' && label.endsWith('__')
    ? classnames(...args)
    : classnames(label, ...args);
};

export const adHoc = (...args: any[]) => {
  return args;
};
