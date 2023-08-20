import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import {
  DefaultDialogButtonTrim,
  DialogButtonTrimT,
} from '/src/frames/components/DialogButton/trim';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { getMode, getModeCn } from '/src/utils/trim';

// Import trim
import './Blue-DialogButton.scss';
import './SkyBlueWithBorder-DialogButton.scss';
import './Teal-DialogButton.scss';
import './TealWithWhiteText-DialogButton.scss';

export type PropsT = {
  className?: any;
  trim?: DialogButtonTrimT;
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
    trim,
    dataCy,
    disabled,
    iconName,
    label,
    ...rest
  } = props;

  const mode = getMode(trim ?? DefaultDialogButtonTrim, {
    danger,
    disabled,
  });

  return (
    /*
    🔳 DialogButton 🔳
    */
    <button
      className={cn(
        trim?.componentName ?? 'DialogButton',
        [
          getModeCn(mode.root),
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
      {iconName && <Icon className={getModeCn(mode.Icon)} name={iconName} />}
      {label}
    </button>
  );
};
