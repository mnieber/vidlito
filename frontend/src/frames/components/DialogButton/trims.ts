import {
  DefaultDialogButtonTrim,
  DialogButtonS,
} from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { createTrim } from '/src/utils/trim';

export const BlueDialogButtonTrim = createTrim(
  'Blue-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
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
  }
);

export const TealDialogButtonTrim = createTrim(
  'Teal-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
      Icon: {
        color: DialogButtonS.color.tealWithDarkText(),
      },
    },
  }
);

export const TealWithWhiteTextDialogButtonTrim = createTrim(
  'TealWithWhiteText-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
      Icon: {
        color: DialogButtonS.color.tealWithWhiteText(),
      },
    },
  }
);

export const SkyBlueWithBorderDialogButtonTrim = createTrim(
  'SkyBlueWithBorder-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
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
