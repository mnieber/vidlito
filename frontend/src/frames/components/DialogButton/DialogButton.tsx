import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { trimLeafToCn } from '/src/utils/trim';
import { RecursivePartial } from '/src/utils/types';

// Import trim
import './Blue-DialogButton.scss';
import './SkyBlueWithBorder-DialogButton.scss';
import './Teal-DialogButton.scss';
import './TealWithWhiteText-DialogButton.scss';

export type DialogButtonTrimT = {
  componentName: string;

  base: {
    root: {
      fontSize: any;
      padding: any;
    };
    Icon: {
      margin: any;
      size: any;
      color: any;
    };
  };
  disabled?: RecursivePartial<DialogButtonTrimT['base']>;
};

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
          trimLeafToCn(trim.base.root),
          props.disabled && trim.disabled && trimLeafToCn(trim.disabled.root),
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
      {iconName && (
        <Icon className={trimLeafToCn(trim.base.Icon)} name={iconName} />
      )}
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
  Icon: {
    margin: {
      medium: () => 'mr-2',
    },
  },
};

export const DefaultDialogButtonTrim = {
  componentName: 'Default',

  base: {
    root: {
      fontSize: DialogButtonS.fontSize.medium(),
      padding: DialogButtonS.padding.medium(),
    },
    Icon: {
      margin: DialogButtonS.Icon.margin.medium(),
      size: IconS.size.s20(),
      color: IconS.color.gray(),
    },
  },
  disabled: undefined,
};
