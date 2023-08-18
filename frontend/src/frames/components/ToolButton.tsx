import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Modest-ToolButton.scss';
import './ToolButton.scss';

export type PropsT = {
  className?: any;
  componentClassName?: string;
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
        props.componentClassName ?? 'ToolButton',
        {
          'ToolButton--disabled': props.disabled,
        },
        [L.row.skewer(), props.className]
      )}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <Icon
        className={cn(
          'ToolButton__Icon',
          {
            'ToolButton__Icon--disabled': props.disabled,
          },
          [
            ToolButtonS.icon.size[props.iconSize ?? 'medium'](),
            ToolButtonS.icon.margin[props.iconMargin ?? 'medium'](),
          ]
        )}
        name={props.iconName}
      />
      {props.label}
    </button>
  );
};

export const ToolButtonS = {
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
