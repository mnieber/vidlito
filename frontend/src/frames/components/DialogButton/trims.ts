import {
  DefaultDialogButtonTrim,
  DialogButtonS,
} from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { createTrim } from '/src/utils/trim';

export const BlueDialogButtonTrim = createTrim(DefaultDialogButtonTrim, {
  base: {
    componentName: 'Blue-DialogButton',
    root: {
      color: DialogButtonS.color.blueWithDarkText(),
    },
    Icon: {
      color: IconS.color.blueDarkest(),
    },
  },
  disabled: {
    root: {
      color: DialogButtonS.color.disabled(),
    },
  },
});

export const TealDialogButtonTrim = createTrim(DefaultDialogButtonTrim, {
  base: {
    componentName: 'Teal-DialogButton',
    root: {},
    Icon: {
      color: DialogButtonS.color.tealWithDarkText(),
    },
  },
});

export const TealWithWhiteTextDialogButtonTrim = createTrim(
  DefaultDialogButtonTrim,
  {
    base: {
      componentName: 'TealWithWhiteText-DialogButton',
      root: {},
      Icon: {
        color: DialogButtonS.color.tealWithWhiteText(),
      },
    },
  }
);

export const SkyBlueWithBorderDialogButtonTrim = createTrim(
  DefaultDialogButtonTrim,
  {
    base: {
      componentName: 'SkyBlueWithBorder-DialogButton',
      root: {
        border: 'border-2 border-blue-primary',
        color: DialogButtonS.color.withSkyBlueText(),
      },
      Icon: {
        color: IconS.color.bluePrimary(),
      },
    },
  }
);
