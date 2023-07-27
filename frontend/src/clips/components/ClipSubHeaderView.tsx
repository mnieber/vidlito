import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { PlayerControls } from '/src/clips/components/PlayerControls';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipSubHeaderView.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.clip,
  ...dps.playlist,
};

export const ClipSubHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'ClipSubHeaderView',
          'flex flex-row flex-wrap',
          props.className
        )}
      >
        <AuthorCard className="mr-4" />
        <PlayerControls className="mr-4" />
        <TagsCard
          clipTags={props.clip?.tags ?? []}
          playlistTags={props.playlist?.tags ?? []}
        />
      </div>
    );
  }, DefaultProps)
);
