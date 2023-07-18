import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

import './CtaButton.scss';

export const CtaButtonL = {
  root: () => cn('CtaButton', L.row.skewer()),
  // Clients should pick one color from the list below.
  color: {
    darkBlueOnSkyBlue: () => 'c-blue-darkest-on-sky-blue-btn-color',
    darkBlueOnTeal: () => 'c-blue-darkest-on-teal-btn-color',
  },
  icon: () => cn('mr-4', 'h-[30px]', 'w-[30px]', 'min-w-[30px]'),
};
