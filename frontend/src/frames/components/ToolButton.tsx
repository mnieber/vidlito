import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ToolButton.Default.scss';
import './ToolButton.Modest.scss';

export type PropsT = {
  className?: any;
  themeClassName?: string;
  disabled?: boolean;
  iconName: string;
  iconSize?: 'normal' | 'small';
  iconMargin?: 'normal' | 'none';
  label: string;
} & ButtonPropsT;

export const ToolButton = (props: PropsT) => {
  return (
    <button
      className={cn(
        ['ToolButton', props.themeClassName ?? 'Default'],
        [],
        [
          L.row.skewer(),
          props.disabled && 'ToolButton--disabled',
          props.className,
        ]
      )}
      onClick={props.onClick}
    >
      <Icon
        className={cn(
          'ToolButton__Icon',
          props.disabled && 'ToolButton__Icon--disabled',
          ToolButtonL.icon.size[props.iconSize ?? 'normal'](),
          ToolButtonL.icon.margin[props.iconMargin ?? 'normal']()
        )}
        name={props.iconName}
      />
      {props.label}
    </button>
  );
};

export const ToolButtonL = {
  icon: {
    size: {
      normal: () => cn(['h-[32px] w-[32px]', 'p-2']),
      small: () => cn(['h-[24px] w-[24px]', 'p-1']),
    },
    margin: {
      normal: () => cn('mr-2'),
      none: () => cn(),
    },
  },
};
