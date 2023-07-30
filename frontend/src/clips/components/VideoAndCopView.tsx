import { observer } from 'mobx-react-lite';
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
  ...dps.dashboardState,
};

export const VideoAndCopView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
      >
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel />}
        <CopCard className={cn('max-w-[776px]', 'my-8 mx-2 lg:ml-6 lg:mr-2')} />
      </div>
    );
  }, DefaultProps)
);
