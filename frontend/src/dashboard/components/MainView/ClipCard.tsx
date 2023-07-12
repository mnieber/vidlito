import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { ClipCardDescription } from '/src/dashboard/components/MainView/ClipCardDescription';
import { ClipCardPD } from '/src/dashboard/components/MainView/ClipCardPD';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';
import { useDelayedFlag } from '/src/utils/hooks/useDelayedFlag';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './ClipCard.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clips,
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const ClipCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const notFound = useDelayedFlag(!props.clip && !isLoading(props.clip), 500);
    if (notFound) {
      return <ClipNotFound />;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist = props.dashboardState.showPlaylistView || noClips;

    return (
      <>
        {!noClips && <VideoPlayerPanel className={cn('mb-3')} />}
        {!R.isNil(props.videoPlayerState.panelWidth) && (
          <div
            className={cn(
              'ClipCard__Body',
              //
              //
              L.col.banner(),
              'ml-6 mt-5',
              'max-w-[776px]'
            )}
          >
            <ClipHeaderView className={cn('mb-8')} />
            <AuthorCard>
              <TagsCard />
            </AuthorCard>
            <ClipCardDescription showPlaylist={showPlaylist} />
            <ClipCardPD showPlaylist={showPlaylist} />
            {noClips && <CreateFirstClip className="mt-4" />}
          </div>
        )}
      </>
    );
  }, DefaultProps)
);
