import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Blue-DialogButton.scss';
import './SkyBlueWithBorder-DialogButton.scss';
import './Teal-DialogButton.scss';
import './TealWithWhiteText-DialogButton.scss';

export type PropsT = {
  className?: any;
  danger?: boolean;
  dataCy?: string;
  disabled?: boolean;
  fontSize?: 'medium' | 'big';
  padding?: 'medium' | 'big';
  iconName?: string;
  label: string;
} & ButtonPropsT;

export type DialogButtonPropsT = PropsT;

export const DialogButton = (
  props: PropsT & {
    componentClassName?: string;
  }
) => {
  const {
    className,
    componentClassName,
    danger,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  const name = componentClassName ?? 'DialogButton';

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        name,
        [
          'select-none',
          {
            [name + '--disabled']: disabled,
            [name + '--danger']: danger,
          },
        ],
        DialogButtonS.fontSize[props.fontSize ?? 'medium'](),
        DialogButtonS.padding[props.padding ?? 'medium'](),
        [iconName ? L.row.skewer() : '', className]
      )}
      data-cy={dataCy}
      {...rest}
    >
      {iconName && <Icon className={DialogButtonS.Icon()} name={iconName} />}
      {label}
    </button>
  );
};

export const DialogButtonS = {
  Icon: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
  fontSize: {
    medium: () => 'text-base',
    big: () => 'text-lg',
  },
  padding: {
    medium: () => 'px-4 py-2',
    big: () => 'px-6 py-4',
  },
};
