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
  iconSize?: 'medium' | 'small';
  iconMargin?: 'medium' | 'none';
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
          ToolButtonL.icon.size[props.iconSize ?? 'medium'](),
          ToolButtonL.icon.margin[props.iconMargin ?? 'medium']()
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
      medium: () => cn(['h-[32px] w-[32px]', 'p-2']),
      small: () => cn(['h-[24px] w-[24px]', 'p-1']),
    },
    margin: {
      medium: () => cn('mr-2'),
      none: () => cn(),
    },
  },
};
