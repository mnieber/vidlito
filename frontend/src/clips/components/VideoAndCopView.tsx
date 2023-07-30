import { observer } from 'mobx-react-lite';
import { useSwipeable } from 'react-swipeable';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopCard } from '/src/clips/components/CopCard';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './VideoAndCopView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const VideoAndCopView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const swipeHandlers = useSwipeable({
      onSwiped: (eventData) => console.log('User Swiped!', eventData),
      ...{
        delta: 10, // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
        trackTouch: true, // track touch input
        trackMouse: true, // track mouse input
        rotationAngle: 0, // set a rotation angle
        swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
      },
    });

    const { isClipNotFound } = useIsClipNotFound();

    if (!props.playlist) {
      return null;
    }

    const clipNotFound = isClipNotFound(props.clip);

    return (
      <div
        className={cn('VideoAndCopView', [
          L.col.banner(),
          'grow',
          props.className,
        ])}
        {...swipeHandlers}
      >
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel />}
        <CopCard className={cn('max-w-[776px]', 'my-8 mx-2 lg:ml-6 lg:mr-2')} />
      </div>
    );
  }, DefaultProps)
);
