import { cn } from 'src/utils/classnames';
import './Button.scss';

const base = ['px-4 py-2 font-bold rounded-xl min-w-[max-content]'];

export const button = cn(
  //
  'Button',
  ...base
);

export const smallButton = cn(
  //
  'SmallButton',
  ...base,
  'uk-button-default',
  'uk-button-small'
);

export const bigButton = cn(
  //
  'BigButton',
  ...base
);

export const primaryButton = cn(
  //
  'PrimaryButton',
  ...base
);
