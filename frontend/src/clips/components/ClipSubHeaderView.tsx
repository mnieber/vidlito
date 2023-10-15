import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withContextProps } from 'react-props-from-context';
import { PlayerControls } from '/src/clips/components/PlayerControls';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { AuthorCard } from '/src/playlists/components/AuthorCard';
import { TagsCard } from '/src/playlists/components/TagsCard';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipSubHeaderView.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {
  clip: clipsCtx.clip,
  clipPd: clipsCtx.clipPd,
  playlist: playlistsCtx.playlist,
};

export const ClipSubHeaderView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);
