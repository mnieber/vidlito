import { cn } from 'src/utils/classnames';
import './Button.scss';

// Default button styles
const padding = 'px-4 py-2';
const rounded = 'rounded-xl';
const bold = 'font-bold';
const autoScale = 'min-w-[max-content]';

const base = [padding, rounded, bold, autoScale];

// Button variant styles

const darkBlueOnSkyBlue = cn('bg-blue-400 text-blue-50 hover:bg-blue-600');
const skyBlueText = 'text-blue-400 hover:text-blue-600';
const darkBlueOnTeal = cn('bg-teal-400 text-blue-50 hover:bg-teal-600');

// Button variants

export const bigButton = cn(
  //
  'DialogButton',
  ...base
);

export const primaryButton = cn(
  //
  'PrimaryButton',
  darkBlueOnSkyBlue,
  ...base
);

export const primaryGhostButton = cn(
  //
  'PrimaryGhostButton',
  skyBlueText,
  ...base
);

export const secundaryButton = cn(
  //
  'SecundaryButton',
  darkBlueOnTeal,
  ...base
);
