import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

import './DropdownButton.scss';

export const DropdownButtonL = {
  root: () => cn('DropdownButton', L.row.skewer(), 'justify-between'),
  color: {
    blue: () => 'text-blue-primary',
  },
  text: () => '',
  icon: () => cn('h-[30px]', 'w-[30px]', 'fill-gray-text'),
};
