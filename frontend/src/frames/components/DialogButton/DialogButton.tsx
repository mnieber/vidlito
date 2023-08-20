import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import trim
import './Blue-DialogButton.scss';
import './SkyBlueWithBorder-DialogButton.scss';
import './Teal-DialogButton.scss';
import './TealWithWhiteText-DialogButton.scss';

export type PropsT = {
  className?: any;
  trim?: typeof DefaultDialogButtonTrim;
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
    trim: propsTrim,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  const trim = propsTrim ?? DefaultDialogButtonTrim;

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        trim.componentName,
        [
          trim.base.root(),
          props.disabled && trim.disabled.root(),
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
      {iconName && <Icon className={trim.base.Icon()} name={iconName} />}
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

export const DefaultDialogButtonTrim = {
  componentName: 'DialogButton',

  base: {
    root: () =>
      cn(DialogButtonS.fontSize.medium(), DialogButtonS.padding.medium()),
    Icon: () => cn('mr-2', IconS.size.s20()),
  },
  disabled: {
    root: () => cn(),
  },
};
