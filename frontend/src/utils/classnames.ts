import classnames from 'classnames';

export const cn = classnames;

export const d = (x: string): string => {
  return process.env.NODE_ENV === 'development' ? x.toString() : '';
};
