import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './DialogButton.scss';

type ButtonPropsT = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type PropsT = {
  className?: any;
  danger?: boolean;
  dataCy?: string;
  disabled?: boolean;
  iconName?: string;
  label: string;
} & ButtonPropsT;

export type DialogButtonPropsT = Omit<PropsT, 'color'>;

export const DialogButton = (
  props: PropsT & {
    color: 'blue' | 'teal';
    classNames?: {
      base: string;
      danger: string;
      disabled: string;
      default: string;
    };
  }
) => {
  const {
    className,
    classNames,
    color,
    danger,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  const isBlue = color === 'blue';
  const isTeal = color === 'teal';
  const defaultClass = isBlue
    ? 'DialogButton--default-blue'
    : isTeal
    ? 'DialogButton--default-teal'
    : '';

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        classNames?.base ?? 'DialogButton',
        [
          {
            [classNames?.default ?? defaultClass]: !danger,
            [classNames?.disabled ?? 'DialogButton--disabled']: disabled,
            [classNames?.danger ?? 'DialogButton--danger']: danger,
          },
        ],
        [L.row.skewer(), className]
      )}
      data-cy={dataCy}
      {...rest}
    >
      {iconName && (
        <Icon
          className={cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]')}
          name={iconName}
        />
      )}
      {label}
    </button>
  );
};

export const DialogButtonL = {
  root: () => cn('DialogButton', L.row.skewer()),
  // Clients should pick one color from the list below.
  color: {
    darkBlueOnSkyBlue: () => 'btnSkyBlueWithDarkText',
    darkBlueOnTeal: () => 'btnTealWithDarkText',
    skyBlueTextAndBorder: () =>
      'btnWithSkyBlueText border-2 border-blue-primary',
  },
  icon: {
    root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
    color: {
      skyBlue: () => 'fill-blue-primary',
      gray: () => 'fill-gray-text',
    },
  },
};
