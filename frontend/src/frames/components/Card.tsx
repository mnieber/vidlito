import { colBanner } from 'src/frames/components/Banner';
import { cn } from 'src/utils/classnames';
import './Card.scss';

export const card = cn(
  'Card',
  colBanner,
  'py-[18px] px-4',
  '',
  'bg-gray-100 text-gray-700',
  'rounded-lg'
);
