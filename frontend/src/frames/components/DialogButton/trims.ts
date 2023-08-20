import { DefaultDialogButtonTrim } from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { createTrim } from '/src/utils/trim';

export const BlueDialogButtonTrim = createTrim(
  'Blue-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
      Icon: {
        color: IconS.color.blueDarkest(),
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
        color: IconS.color.tealDark(),
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
        color: IconS.color.white(),
      },
    },
  }
);

export const SkyBlueWithBorderDialogButtonTrim = createTrim(
  'SkyBlueWithBorder-DialogButton',
  DefaultDialogButtonTrim,
  {
    base: {
      Icon: {
        color: IconS.color.bluePrimary(),
      },
    },
  }
);
