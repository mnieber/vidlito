import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const LviL = {
  root: () => cn('py-1', 'my-1', L.row.skewer()),
  icon: { root: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]') },
  title: () => cn('grow', 'pr-2.5'),
};
