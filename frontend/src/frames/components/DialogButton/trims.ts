import { DefaultDialogButtonTrims } from '/src/frames/components/DialogButton';
import { IconS } from '/src/frames/components/Icon';
import { createTrims } from '/src/utils/trim';

export const BlueDialogButtonTrims = createTrims(
  'Blue-DialogButton',
  DefaultDialogButtonTrims,
  {
    base: {
      Icon: {
        color: IconS.color.blueDarkest(),
      },
    },
  }
);

export const TealDialogButtonTrims = createTrims(
  'Teal-DialogButton',
  DefaultDialogButtonTrims,
  {
    base: {
      Icon: {
        color: IconS.color.tealDark(),
      },
    },
  }
);

export const TealWithWhiteTextDialogButtonTrims = createTrims(
  'TealWithWhiteText-DialogButton',
  DefaultDialogButtonTrims,
  {
    base: {
      Icon: {
        color: IconS.color.white(),
      },
    },
  }
);

export const SkyBlueWithBorderDialogButtonTrims = createTrims(
  'SkyBlueWithBorder-DialogButton',
  DefaultDialogButtonTrims,
  {
    base: {
      Icon: {
        color: IconS.color.bluePrimary(),
      },
    },
  }
);
