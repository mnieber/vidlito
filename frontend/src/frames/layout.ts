import { cn } from '/src/utils/classnames';

// Import styles
import '/src/forms/components/FormField.scss';
import '/src/forms/components/FormFieldButton.scss';
import '/src/frames/components/CtaButton.scss';
import '/src/frames/components/DialogButton.scss';
import '/src/frames/components/DropdownButton.scss';
import '/src/frames/components/ToolButton.scss';
import '/src/frames/components/WallPaperCard.scss';

export const breakpoints = {
  xs: '320px',
  small: '480px',
  medium: '768px',
  large: '976px',
  xlarge: '1280px',
};

export const L = {
  auth: {
    // An AuthCard has:
    // - a Form
    // - a FormCaption that appears just below the form (e.g. "Did you forget your password?")
    // - a CardFooter that appears at the bottom of the card (e.g. "Register for an account")
    AuthCard: {
      Form: () => '',
      FormCaption: () => 'mt-2',
      CardFooter: () => 'mt-8',
    },
    // An AuthForm has:
    // - a GlobalError. This component shows an error message with some space below it.
    //   Note: if there is no global error, then no error - or space - is shown.
    // - a Header. This is a text above the form, e.g. 'Enter your email and password to sign in'.
    // - one or more Fields. A field is a wrapper around the form-field label, the form-field
    //   and the form-field-error.
    // - a Button, e.g. 'Sign In'.
    AuthForm: {
      GlobalError: () => 'mb-2',
      Header: () => 'mb-2',
      Field: () => 'mb-2',
      Button: () => '',
    },
    // An AuthPage has:
    // - a LogoCard that appears on the left, e.g. 'Welcome to vidlito'.
    // - a Gap that separates the LogoCard from the AuthCard.
    // - an AuthCard on the right, e.g. a card for signing in.
    AuthPage: {
      Gap: () => 'w-[300px]',
    },
  },
  DropdownButton: {
    root: () => cn('DropdownButton', L.row.skewer(), 'justify-between'),
    color: {
      blue: () => 'text-primaryBlue',
    },
    text: () => '',
    icon: () => cn('h-[30px]', 'w-[30px]', 'fill-textGray'),
  },
  FormField: {
    root: () => 'FormField flex flex-col',
    input: () => 'FormField__Input grow',
    FormFieldButton: {
      root: () => 'FormFieldButton',
      gap: () => 'mr-0.5',
    },
  },
  Lvi: {
    root: () => cn('py-1', 'my-1', L.row.skewer()),
    icon: { root: () => L.DialogButton.icon.root() },
    title: () => cn('grow', 'pr-2.5'),
  },
  main: {
    // A MainForm has:
    // - a GlobalError. This component shows an error message with some space below it.
    //   Note: if there is no global error, then no error - or space - is shown.
    // - one or more Fields. A field is a wrapper around the form-field label, the form-field
    //   and the form-field-error.
    // - a Buttons container (optional, if there is more than one button).
    // - one or more Button components. E.g. a 'Save Clip' button.
    MainForm: {
      root: () => cn('MainForm', L.col.banner()),
      GlobalError: () => 'mb-2',
      Field: () => 'mb-6',
      Buttons: () => cn('', [L.row.skewer(), 'self-end']),
      Button: {
        root: () => '',
        gap: () => 'mr-2',
      },
    },
  },
  DialogButton: {
    root: () => cn('DialogButton', L.row.skewer()),
    // Clients should pick one color from the list below.
    color: {
      darkBlueOnSkyBlue: () => 'c-dark-blue-on-sky-blue-btn-color',
      darkBlueOnTeal: () => 'c-dark-blue-on-teal-btn-color',
      skyBlueTextAndBorder: () => 'c-sky-blue-text border-2 border-primaryBlue',
    },
    icon: {
      root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
      color: { skyBlue: () => 'fill-primaryBlue' },
    },
  },
  CtaButton: {
    root: () => cn('CtaButton', L.row.skewer()),
    // Clients should pick one color from the list below.
    color: {
      darkBlueOnSkyBlue: () => 'c-dark-blue-on-sky-blue-btn-color',
      darkBlueOnTeal: () => 'c-dark-blue-on-teal-btn-color',
    },
    icon: () => cn('mr-4', 'h-[30px]', 'w-[30px]', 'min-w-[30px]'),
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
  WallPaperCard: {
    root: () =>
      cn('WallPaperCard', 'flex flex-col justify-evenly', 'w-full', 'grow'),
    message: () => cn('WallPaperCard__Message'),
  },
  row: {
    skewer: () => 'flex flex-row items-center',
    banner: () => 'flex flex-row items-stretch',
    flagPole: () => 'flex flex-row items-start',
  },
  col: {
    skewer: () => 'flex flex-col items-center',
    banner: () => 'flex flex-col items-stretch',
    flagPole: () => 'flex flex-col items-start',
    flagPoleRev: () => 'flex flex-col items-end',
  },
};
