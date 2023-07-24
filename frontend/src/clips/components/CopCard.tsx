import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipNotFound } from '/src/clips/components/ClipNotFound';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { useIsClipNotFound } from '/src/clips/hooks/useIsClipNotFound';
import { CardL } from '/src/frames/components/Card';
import { LoaderBar } from '/src/frames/components/LoaderBar';
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
  ...dps.playlistsEdit,
  ...dps.playlistPdEdit,
  ...dps.playlistSettingsEdit,
  ...dps.dashboardState,
  ...dps.isOwner,
};

export const CopCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { isClipNotFound } = useIsClipNotFound();

    if (!props.playlist) {
      return null;
    }

    const showLoader = isLoading(props.playlist) || isLoading(props.clips);

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      props.dashboardState.playlistState.showPlaylistView || noClips;
    const clipNotFound = isClipNotFound(props.clip);
    const cop = showPlaylist ? props.playlist : props.clip;
    const separator = ['my-4', 'border-t border-gray-300'];

    return (
      <>
        {clipNotFound && <ClipNotFound />}
        {!clipNotFound && <VideoPlayerPanel className={cn('')} />}
        {showLoader && <CopCardBodyLoader />}
        {!showLoader &&
          !R.isNil(props.dashboardState.panelState.panelWidth) && (
            <div
              className={cn(
                'CopCard__Body',
                [],
                [L.col.banner(), 'grow', 'ml-6 my-8', 'max-w-[776px]']
              )}
            >
              <ClipHeaderView className={cn('mb-8')} />
              <AuthorCard>
                <TagsCard
                  clipTags={props.clip?.tags ?? []}
                  playlistTags={props.playlist?.tags ?? []}
                />
              </AuthorCard>
              <div
                className={cn('CopCard__Forms', 'mt-8', CardL.size.medium())}
              >
                <CopDescription showPlaylist={showPlaylist} className="" />
                {!cop?.isTransient && (
                  <>
                    <div className={cn(separator)} />
                    <CopPd showPlaylist={showPlaylist} className="" />
                  </>
                )}
                {props.isOwner(cop) && !cop?.isTransient && (
                  <>
                    <div className={cn(separator)} />
                    <CopSettings className="" showPlaylist={showPlaylist} />
                  </>
                )}
              </div>
              {noClips &&
                props.isOwner(props.playlist) &&
                !props.playlistsEdit.isEditing &&
                !props.playlistPdEdit.isEditing &&
                !props.playlistSettingsEdit.isEditing && (
                  <CreateFirstClip className="mt-4 min-h-[200px]" />
                )}
            </div>
          )}
      </>
    );
  }, DefaultProps)
);

export const CopCardBodyLoader = observer(() => {
  return (
    <div className={cn('CopCardLoader', 'ml-6')}>
      <LoaderBar className={cn('h-12 mt-8 mb-10')} />
      <LoaderBar className={cn('h-4 mb-10')} />
      <LoaderBar className={cn('h-[170px]')} />
    </div>
  );
});
