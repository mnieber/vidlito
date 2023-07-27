import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopCard } from '/src/clips/components/CopCard';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './VideoAndCopView.scss';

export type PropsT = {};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const VideoAndCopView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { isClipNotFound } = useIsClipNotFound();

    if (!props.playlist) {
      return null;
    }

    const clipNotFound = isClipNotFound(props.clip);

    return (
      <div className="VideoAndCopView">
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel />}
        <CopCard
          className={cn('max-w-[776px]', 'grow', 'my-8 mx-2 lg:ml-6 lg:mr-2')}
        />
      </div>
    );
  }, DefaultProps)
);
