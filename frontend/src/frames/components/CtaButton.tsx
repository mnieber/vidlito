import { IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

import './CtaButton.scss';

export const CtaButtonS = {
  root: () => cn('CtaButton', L.row.skewer()),
  // Clients should pick one color from the list below.
  color: {
    darkBlueOnSkyBlue: () => 'btnSkyBlueWithDarkText',
    darkBlueOnTeal: () => 'btnTealWithDarkText',
  },
  Icon: () => cn('mr-4', IconS.size.s30()),
};
