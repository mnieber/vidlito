import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const LviS = {
  root: () => cn('py-1', 'my-1', L.row.skewer()),
  Icon: () => cn('mr-2', 'h-[20px]', 'w-[20px]', 'min-w-[20px]'),
  Title: () => cn('grow', 'pr-2.5'),
};
