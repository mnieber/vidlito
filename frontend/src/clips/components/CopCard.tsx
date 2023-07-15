import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { CopSettings } from '/src/playlists/components/CopSettings';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';
import { useDelayedFlag } from '/src/utils/hooks/useDelayedFlag';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './CopCard.scss';

export type PropsT = {};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.clips,
  ...dps.dashboardState,
  ...dps.videoPlayerState,
  ...dps.isOwner,
};

export const CopCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const clipNotFound = useDelayedFlag(
      props.playlist && !props.clip && !isLoading(props.clip),
      500,
      []
    );

    if (!props.playlist) {
      return null;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist = props.dashboardState.showPlaylistView || noClips;

    return (
      <>
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && !noClips && <VideoPlayerPanel className={cn('')} />}
        {!R.isNil(props.videoPlayerState.panelWidth) && (
          <div
            className={cn(
              'CopCard__Body',
              //
              //
              L.col.banner(),
              'ml-6 mt-8',
              'max-w-[776px]'
            )}
          >
            <ClipHeaderView className={cn('mb-8')} />
            <AuthorCard>
              <TagsCard />
            </AuthorCard>
            <CopDescription showPlaylist={showPlaylist} className="mt-8" />
            <CopPd showPlaylist={showPlaylist} className="mt-8" />
            {showPlaylist && props.isOwner(props.playlist) && (
              <CopSettings className="mt-8" />
            )}
            {noClips && props.isOwner(props.clip) && (
              <CreateFirstClip className="mt-4" />
            )}
          </div>
        )}
      </>
    );
  }, DefaultProps)
);
