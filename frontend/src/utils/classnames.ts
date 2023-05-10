import classnames from 'classnames';

export const cn = (label: string, ...args: any[]) => {
  return process.env.NODE_ENV !== 'development' && label.endsWith('__')
    ? classnames(...args)
    : classnames(label, ...args);
};
