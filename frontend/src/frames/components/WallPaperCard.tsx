import { cn } from '/src/utils/classnames';

import './WallPaperCard.scss';

export const WallPaperCardL = {
  root: () =>
    cn('WallPaperCard', 'flex flex-col justify-evenly', 'w-full', 'grow'),
  message: () => cn('WallPaperCard__Message'),
};
