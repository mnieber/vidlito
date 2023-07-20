import { cn } from '/src/utils/classnames';

// Import styles
import './MessageCard.scss';
import '/src/frames/components/WallPaper.scss';

export const MessageCardL = {
  root: () =>
    cn('MessageCard', 'flex flex-col justify-evenly', 'w-full', 'grow'),
  message: () => cn('MessageCard__Message'),
  wallpaper: () => cn('WallPaper'),
};
