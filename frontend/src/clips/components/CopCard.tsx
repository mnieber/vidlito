import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { CopSettings } from '/src/playlists/components/CopSettings';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';
import { VideoPlayerPanel } from '/src/videos/components';

// Import styles
import './CopCard.scss';

export type PropsT = {};

const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
  ...dps.clips,
  ...dps.dashboardState,
  ...dps.isOwner,
};

export const CopCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { isClipNotFound } = useIsClipNotFound();

    if (!props.playlist) {
      return null;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist = props.dashboardState.showPlaylistView || noClips;
    const clipNotFound = isClipNotFound(props.clip);
    const cop = showPlaylist ? props.playlist : props.clip;

    return (
      <>
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel className={cn('')} />}
        {!R.isNil(props.dashboardState.panelWidth) && (
          <div
            className={cn(
              'CopCard__Body',
              [],
              [L.col.banner(), 'ml-6 my-8', 'max-w-[776px]']
            )}
          >
            <ClipHeaderView className={cn('mb-8')} />
            <AuthorCard>
              <TagsCard
                clipTags={props.clip?.tags ?? []}
                playlistTags={props.playlist?.tags ?? []}
              />
            </AuthorCard>
            <CopDescription showPlaylist={showPlaylist} className="mt-8" />
            <CopPd showPlaylist={showPlaylist} className="mt-8" />
            {props.isOwner(cop) && (
              <CopSettings className="mt-8" showPlaylist={showPlaylist} />
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
