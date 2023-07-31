import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ClipHeaderView } from '/src/clips/components/ClipHeaderView';
import { ClipSubHeaderView } from '/src/clips/components/ClipSubHeaderView';
import { CopCardForms } from '/src/clips/components/CopCardForms';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import { CreateFirstClip } from '/src/playlists/components/CreateFirstClip';
import { cn } from '/src/utils/classnames';

// Import styles
import './CopCard.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.clips,
  ...dps.playlistsEdit,
  ...dps.playlistPdEdit,
  ...dps.playlistSettingsEdit,
  ...dps.isOwner,
};

export const CopCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const showLoader = isLoading(props.playlist) || isLoading(props.clips);
    if (showLoader) {
      return <CopCardLoader />;
    }

    const noClips = !props.clips.length && !isLoading(props.clips);

    return (
      <div className={cn('CopCard', [L.col.banner(), 'grow', props.className])}>
        <ClipHeaderView className={cn('mb-8')} />
        <ClipSubHeaderView />
        <CopCardForms className="mt-8" />
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
