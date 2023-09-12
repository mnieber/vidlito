import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
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
  ...dps.clipPd,
  ...dps.playlist,
};

export const ClipSubHeaderView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const clipTags = R.uniq([
      ...(props.clip?.tags ?? []),
      ...(props.clipPd?.tags ?? []),
    ]);
    const playlistTags = R.uniq([
      ...(props.playlist?.tags ?? []),
      ...(props.playlist?.playlistPd?.tags ?? []),
    ]);
    return (
      <div
        className={cn('ClipSubHeaderView', [
          'flex flex-row flex-wrap',
          props.className,
        ])}
      >
        <AuthorCard className="mr-4" />
        <PlayerControls className="mr-4" />
        <TagsCard clipTags={clipTags} playlistTags={playlistTags} />
      </div>
    );
  }, DefaultProps)
);
