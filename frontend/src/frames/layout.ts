import { cn } from '/src/utils/classnames';

// Import styles
import '/src/forms/components/FormField.scss';
import '/src/forms/components/FormFieldButton.scss';
import '/src/frames/components/DialogButton.scss';
import '/src/frames/components/ToolButton.scss';

export const breakpoints = {
  xs: '320px',
  small: '480px',
  medium: '768px',
  large: '976px',
  xlarge: '1280px',
};

export const L = {
  FormField: {
    root: () => 'FormField flex flex-col',
    input: () => 'FormField__Input grow',
    FormFieldButton: {
      root: () => 'FormFieldButton',
      gap: () => 'mr-0.5',
    },
  },
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
  ToolButton: {
    root: () => cn('', ['ToolButton', L.row.skewer()]),
    disabled: () => 'ToolButton--disabled',
    icon: {
      root: () => cn('', ['ToolButton__Icon']),
      size: {
        normal: () => cn('', ['h-[32px] w-[32px]', 'mr-2', 'p-2']),
        small: () => cn('', ['h-[24px] w-[24px]', 'mr-2', 'p-1']),
      },
      disabled: () => 'ToolButton__Icon--disabled',
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
