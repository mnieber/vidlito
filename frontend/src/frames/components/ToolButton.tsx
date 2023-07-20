import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ToolButton.scss';

export type PropsT = {
  className?: any;
  disabled?: boolean;
  iconName: string;
  iconSize?: 'normal' | 'small';
  label: string;
} & ButtonPropsT;

export const ToolButton = (props: PropsT) => {
  return (
    <button
      className={cn(
        'ToolButton',
        [],
        [
          ToolButtonL.root(),
          props.disabled && 'ToolButton--disabled',
          props.className,
        ]
      )}
      onClick={props.onClick}
    >
      <Icon
        className={cn(
          ToolButtonL.icon.root(),
          props.disabled && 'ToolButton__Icon--disabled',
          ToolButtonL.icon.size[props.iconSize ?? 'normal']()
        )}
        name={props.iconName}
      />
      {props.label}
    </button>
  );
};

export const ToolButtonL = {
  root: () => cn('', ['ToolButton', L.row.skewer()]),
  disabled: () => 'ToolButton--disabled',
  icon: {
    root: () => cn('', ['ToolButton__Icon']),
    size: {
      normal: () => cn('', ['h-[32px] w-[32px]', 'mr-2', 'p-2']),
      small: () => cn('', ['h-[24px] w-[24px]', 'mr-2', 'p-1']),
    },
    disabled: () => 'ToolButton__Icon--disabled',
  },
};
