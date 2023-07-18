import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn, foo } from '/src/utils/classnames';

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
      className={foo({
        component: [
          classNames?.base ?? 'DialogButton',
          // 'DialogButton--default-blue',
          {
            [classNames?.default ?? defaultClass]: !danger,
            [classNames?.disabled ?? 'DialogButton--disabled']: disabled,
            [classNames?.danger ?? 'DialogButton--danger']: danger,
          },
        ],
        adhoc: [L.row.skewer(), className],
      })}
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
