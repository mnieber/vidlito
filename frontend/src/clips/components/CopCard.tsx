import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { CopDescription } from '/src/clips/components/CopDescription';
import { CopPd } from '/src/clips/components/CopPd';
import { PlayerControls } from '/src/clips/components/PlayerControls';
import { CardL } from '/src/frames/components/Card';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { CopSettings } from '/src/playlists/components/CopSettings';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopCard.scss';

export type PropsT = {
  className?: any;
};

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
    const showLoader = isLoading(props.playlist) || isLoading(props.clips);
    if (showLoader) {
      return <CopCardLoader />;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);
    const showPlaylist =
      props.dashboardState.panelState.showPlaylistView || noClips;
    const cop = showPlaylist ? props.playlist : props.clip;

    const separator = ['my-4', 'border-t border-gray-300'];

    return (
      <div className={cn('CopCard', [], [L.col.banner(), props.className])}>
        <ClipHeaderView className={cn('mb-8')} />
        <div className={cn('CopCard__SubHeader', 'flex flex-row flex-wrap')}>
          <AuthorCard className="mr-4" />
          <PlayerControls className="mr-4" />
          <TagsCard
            clipTags={props.clip?.tags ?? []}
            playlistTags={props.playlist?.tags ?? []}
          />
        </div>
        <div className={cn('CopCard__Forms', 'mt-8', CardL.size.medium())}>
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
    );
  }, DefaultProps)
);

export const CopCardLoader = observer((props: PropsT) => {
  return (
    <div className={cn('CopCardLoader', props.className)}>
      <LoaderBar className={cn('h-12 mt-8 mb-10')} />
      <LoaderBar className={cn('h-4 mb-10')} />
      <LoaderBar className={cn('h-[170px]')} />
    </div>
  );
});
