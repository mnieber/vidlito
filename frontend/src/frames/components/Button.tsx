import { cn } from 'src/utils/classnames';
import './Button.scss';

const base = ['uk-button', 'min-w-[max-content]'];

export const button = cn(
  //
  'Button',
  ...base,
  'uk-button-default'
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
