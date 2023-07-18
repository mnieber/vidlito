import { cn } from '/src/utils/classnames';

// Import styles
import '/src/frames/components/DialogButton.scss';

export const breakpoints = {
  xs: '320px',
  small: '480px',
  medium: '768px',
  large: '976px',
  xlarge: '1280px',
};

export const L = {
  DialogButton: {
    root: () => cn('DialogButton', L.row.skewer()),
    // Clients should pick one color from the list below.
    color: {
      darkBlueOnSkyBlue: () => 'c-blue-darkest-on-sky-blue-btn-color',
      darkBlueOnTeal: () => 'c-blue-darkest-on-teal-btn-color',
      skyBlueTextAndBorder: () =>
        'c-sky-blue-text border-2 border-blue-primary',
    },
    icon: {
      root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
      color: {
        skyBlue: () => 'fill-blue-primary',
        gray: () => 'fill-textGray',
      },
    },
  },
  row: {
    skewer: () => 'flex flex-row items-center',
    banner: () => 'flex flex-row items-stretch',
    flagPole: () => 'flex flex-row items-start',
    revFlagPole: () => 'flex flex-row items-end',
  },
  col: {
    skewer: () => 'flex flex-col items-center',
    banner: () => 'flex flex-col items-stretch',
    flagPole: () => 'flex flex-col items-start',
    flagPoleRev: () => 'flex flex-col items-end',
  },
};
