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
  label: string;
} & ButtonPropsT;

export type DialogButtonPropsT = PropsT;

export const DialogButton = (
  props: PropsT & {
    classNames: {
      base?: string;
      danger?: string;
      disabled?: string;
      default?: string;
    };
  }
) => {
  const { classNames, danger, dataCy, disabled, className, label, ...rest } =
    props;
  return (
    <button
      className={cn(
        classNames.base ?? 'DialogButton',
        {
          [classNames.disabled ?? 'DialogButton--disabled']: disabled,
          [classNames.default ?? 'DialogButton--default']: !danger,
          [classNames.danger ?? 'DialogButton--danger']: danger,
        },
        className
      )}
      data-cy={dataCy}
      {...rest}
    >
      {label}
    </button>
  );
};
