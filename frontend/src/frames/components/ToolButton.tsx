import { rowSkewer } from 'src/frames/components/Skewer';
import { cn } from 'src/utils/classnames';
import './ToolButton.scss';

export const ToolButton_ = {
  root: ['ToolButton', rowSkewer],
  icon: {
    normal: cn(['h-[32px] w-[32px]', 'mr-2', 'p-2']),
    small: cn(['h-[24px] w-[24px]', 'mr-2', 'p-1']),
  },
};
