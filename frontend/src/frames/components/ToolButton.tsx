import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './ToolButton.scss';

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
