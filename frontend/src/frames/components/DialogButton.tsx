import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './DialogButton.Blue.scss';
import './DialogButton.SkyBlueWithBorder.scss';
import './DialogButton.TealWithWhiteText.scss';

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
        [iconName ? L.row.skewer() : '', className]
      )}
      data-cy={dataCy}
      {...rest}
    >
      {iconName && (
        <Icon className={DialogButtonL.icon.root()} name={iconName} />
      )}
      {label}
    </button>
  );
};

export const DialogButtonL = {
  icon: {
    root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
  },
};
