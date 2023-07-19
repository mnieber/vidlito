import { cn } from '/src/utils/classnames';

// Import styles
import './WallPaperCard.scss';
import '/src/frames/components/WallPaper.scss';

export const WallPaperCardL = {
  root: () =>
    cn(
      'WallPaperCard',
      'WallPaper',
      'flex flex-col justify-evenly',
      'w-full',
      'grow'
    ),
  message: () => cn('WallPaperCard__Message'),
};
