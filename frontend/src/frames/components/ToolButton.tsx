import { ButtonPropsT } from '/src/frames/components/ButtonPropsT';
import { Icon, IconS } from '/src/frames/components/Icon';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './Modest-ToolButton.scss';
import './ToolButton.scss';

export type PropsT = {
  className?: any;
  componentClassName?: string;
  disabled?: boolean;
  iconClassName?: string;
  iconName: string;
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
          props.iconClassName ?? Default_ToolButtonS.icon(),
          {
            'ToolButton__Icon--disabled': props.disabled,
          }
        )}
        name={props.iconName}
      />
      {props.label}
    </button>
  );
};

export const ToolButtonS = {
  Icon: {
    size: {
      medium: () => cn([IconS.size.s32(), 'p-2']),
      small: () => cn([IconS.size.s24(), 'p-1']),
    },
    margin: {
      medium: () => cn('mr-2'),
      none: () => cn(),
    },
  },
};

export const Default_ToolButtonS = {
  icon: () =>
    cn(ToolButtonS.Icon.size.medium(), ToolButtonS.Icon.margin.medium()),
};
