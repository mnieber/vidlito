import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Modest-ToolButton.scss';
import './ToolButton.scss';

export type PropsT = {
  className?: any;
  trim?: typeof DefaultToolButtonTrim;
  disabled?: boolean;
  iconName: string;
  label: string;
} & ButtonPropsT;

export const ToolButton = (props: PropsT) => {
  const trim = props.trim ?? DefaultToolButtonTrim;

  return (
    <button
      className={cn(
        trim.componentName,
        trim.base.root(),
        props.disabled && trim.disabled.root(),
        { 'ToolButton--disabled': props.disabled },
        [L.row.skewer(), props.className]
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Icon
        className={cn(trim.base.Icon(), props.disabled && trim.disabled.Icon())}
        name={props.iconName}
      />
      {props.label}
    </button>
  );
};

export const ToolButtonS = {
  color: {
    gray: () => cn('text-gray-text'),
    grayDisabled: () => cn('text-gray-300'),
  },
  Icon: {
    size: {
      medium: () => cn([IconS.size.s32(), 'p-2']),
      small: () => cn([IconS.size.s24(), 'p-1']),
    },
    margin: {
      medium: () => cn('mr-2'),
      none: () => cn(),
    },
    color: {
      grayFill: () => cn('fill-gray-text'),
      grayFillDisabled: () => cn('fill-gray-300'),
      grayBackground: () => cn('bg-gray-text'),
      grayBackgroundDisabled: () => cn('fill-gray-300 !bg-[#999999]'),
    },
  },
};

export const DefaultToolButtonTrim = {
  componentName: 'ToolButton',

  // These are applied to the root element and the Icon.
  base: {
    root: () => cn(ToolButtonS.color.gray()),
    Icon: () =>
      cn(
        ToolButtonS.Icon.size.medium(),
        ToolButtonS.Icon.margin.medium(),
        ToolButtonS.Icon.color.grayBackground()
      ),
  },
  // These are layered on top if the ToolButton is disabled.
  disabled: {
    root: () => cn(ToolButtonS.color.grayDisabled()),
    Icon: () => cn(ToolButtonS.Icon.color.grayBackgroundDisabled()),
  },
};
