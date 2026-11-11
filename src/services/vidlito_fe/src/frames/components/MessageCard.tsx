import React from 'react';
import { cn } from '/src/utils/classnames';
// Import styles
import './MessageCard.scss';
import '/src/frames/components/WallPaper.scss';

export type PropsT = React.PropsWithChildren<{
  wallPaper?: boolean;
  className?: any;
}>;

export const MessageCard = (props: PropsT) => {
  return (
    <div
      className={cn(
        ['MessageCard', props.wallPaper && 'WallPaper'],
        ['flex flex-col justify-evenly', 'w-full', 'grow', props.className]
      )}
    >
      {props.children}
    </div>
  );
};

export const MessageCardS = {
  Message: () => cn(['text-3xl text-center text-gray-text'], ['p-4']),
};
