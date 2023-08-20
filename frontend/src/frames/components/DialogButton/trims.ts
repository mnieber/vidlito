import { DefaultDialogButtonTrim } from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { cn } from '/src/utils/classnames';

export const BlueDialogButtonTrim = {
  ...DefaultDialogButtonTrim,
  componentName: 'Blue-DialogButton',

  base: {
    ...DefaultDialogButtonTrim.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.blueDarkest()),
  },
};

export const TealDialogButtonTrim = {
  ...DefaultDialogButtonTrim,
  componentName: 'Teal-DialogButton',

  base: {
    ...DefaultDialogButtonTrim.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.tealDark()),
  },
};

export const TealWithWhiteTextDialogButtonTrim = {
  ...DefaultDialogButtonTrim,
  componentName: 'TealWithWhiteText-DialogButton',

  base: {
    ...DefaultDialogButtonTrim.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.white()),
  },
};

export const SkyBlueWithBorderDialogButtonTrim = {
  ...DefaultDialogButtonTrim,
  componentName: 'SkyBlueWithBorder-DialogButton',

  base: {
    ...DefaultDialogButtonTrim.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.bluePrimary()),
  },
};
