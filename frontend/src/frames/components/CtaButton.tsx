import { DialogButtonS } from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

import './CtaButton.scss';

export const CtaButtonS = {
  root: () => cn('CtaButton', L.row.skewer()),
  // Clients should pick one color from the list below.
  color: {
    darkBlueOnSkyBlue: () => DialogButtonS.color.skyBlueWithDarkText(),
    darkBlueOnTeal: () => DialogButtonS.color.tealWithDarkText(),
  },
  Icon: () => cn('mr-4', IconS.size.s30()),
};
