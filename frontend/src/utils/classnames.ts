import classnames from 'classnames';

export const cn = (label: string, ...args: any[]) => {
  return import.meta.env.PROD && label.endsWith('__')
    ? classnames(...args)
    : classnames(label, ...args);
};
