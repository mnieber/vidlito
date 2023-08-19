import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Blue-DialogButton.scss';
import './SkyBlueWithBorder-DialogButton.scss';
import './Teal-DialogButton.scss';
import './TealWithWhiteText-DialogButton.scss';

export type PropsT = {
  className?: any;
  theme?: typeof DefaultDialogButtonTheme;
  danger?: boolean;
  dataCy?: string;
  disabled?: boolean;
  iconName?: string;
  label: string;
} & ButtonPropsT;

export type DialogButtonPropsT = PropsT;

export const DialogButton = (props: PropsT) => {
  const {
    className,
    danger,
    theme: propsTheme,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  const theme = propsTheme ?? DefaultDialogButtonTheme;

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        theme.componentName,
        [
          theme.base.root(),
          'select-none',
          {
            'DialogButton--disabled': disabled,
            'DialogButton--danger': danger,
          },
        ],
        [iconName ? L.row.skewer() : '', className]
      )}
      data-cy={dataCy}
      {...rest}
    >
      {iconName && <Icon className={theme.base.Icon()} name={iconName} />}
      {label}
    </button>
  );
};

export const DialogButtonS = {
  fontSize: {
    medium: () => 'text-base',
    big: () => 'text-lg',
  },
  padding: {
    medium: () => 'px-4 py-2',
    big: () => 'px-6 py-4',
  },
};

export const DefaultDialogButtonTheme = {
  componentName: 'DialogButton',

  base: {
    root: () =>
      cn(DialogButtonS.fontSize.medium(), DialogButtonS.padding.medium()),
    Icon: () => cn('mr-2', IconS.size.s20()),
  },
  disabled: {},
};

export const BlueDialogButtonTheme = {
  ...DefaultDialogButtonTheme,
  componentName: 'Blue-DialogButton',

  base: {
    ...DefaultDialogButtonTheme.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.blueDarkest()),
  },
};

export const TealDialogButtonTheme = {
  ...DefaultDialogButtonTheme,
  componentName: 'Teal-DialogButton',

  base: {
    ...DefaultDialogButtonTheme.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.tealDark()),
  },
};

export const TealWithWhiteTextDialogButtonTheme = {
  ...DefaultDialogButtonTheme,
  componentName: 'TealWithWhiteText-DialogButton',

  base: {
    ...DefaultDialogButtonTheme.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.white()),
  },
};

export const SkyBlueWithBorderDialogButtonTheme = {
  ...DefaultDialogButtonTheme,
  componentName: 'SkyBlueWithBorder-DialogButton',

  base: {
    ...DefaultDialogButtonTheme.base,
    Icon: () => cn('mr-2', IconS.size.s20(), IconS.color.bluePrimary()),
  },
};
