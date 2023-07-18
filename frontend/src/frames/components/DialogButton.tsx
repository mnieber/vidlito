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

export type DialogButtonPropsT = PropsT;

export const DialogButton = (
  props: PropsT & {
    // HACK: force to be blue or teal
    color: string;
    classNames?: {
      base?: string;
      danger?: string;
      disabled?: string;
      default?: string;
    };
  }
) => {
  const {
    color,
    classNames,
    danger,
    dataCy,
    disabled,
    className,
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
      {props.iconName && (
        <Icon
          className={cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]')}
          name={props.iconName}
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
    darkBlueOnSkyBlue: () => 'c-blue-darkest-on-sky-blue-btn-color',
    darkBlueOnTeal: () => 'c-blue-darkest-on-teal-btn-color',
    skyBlueTextAndBorder: () => 'c-sky-blue-text border-2 border-blue-primary',
  },
  icon: {
    root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
    color: {
      skyBlue: () => 'fill-blue-primary',
      gray: () => 'fill-textGray',
    },
  },
};
