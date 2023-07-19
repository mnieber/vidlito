import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './DialogButton.DefaultBlue.scss';

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
    themeClassName: string;
  }
) => {
  const {
    className,
    themeClassName,
    danger,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        ['DialogButton', themeClassName],
        {
          'DialogButton--disabled': disabled,
          'DialogButton--danger': danger,
        },
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
