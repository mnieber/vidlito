import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipHeaderView } from 'src/clips/components/ClipHeaderView';
import { MarkdownView } from 'src/frames/components';
import { PlaylistDescription } from 'src/playlists/components';
import { usePlaylistDescriptionState } from 'src/playlists/hooks/usePlaylistDescriptionState';
import { cn } from 'src/utils/classnames';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const playlistDescriptionState = usePlaylistDescriptionState();

    return (
      <div className={cn('ClipView', props.className)}>
        <ClipHeaderView
          className={cn('mb-2')}
          togglePlaylistDescription={playlistDescriptionState.toggle}
        />
        {playlistDescriptionState.isExpanded && <PlaylistDescription />}
        <div className={cn('ClipView__Description')}>
          <MarkdownView text={props.clip.description ?? ''} />
        </div>
      </div>
    );
  }, DefaultProps)
);
