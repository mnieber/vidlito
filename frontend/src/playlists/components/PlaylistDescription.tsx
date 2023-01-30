import { observer } from 'mobx-react-lite';
import { PlaylistT } from 'src/api/types/PlaylistT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { MarkdownView } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './PlaylistDescription.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('PlaylistDescription', props.className)}>
        <MarkdownView
          text={
            props.playlist.description ||
            playlistDefaultDescription(props.playlist)
          }
        />
      </div>
    );
  }, DefaultProps)
);

const playlistDefaultDescription = (playlist: PlaylistT) => {
  return `# Welcome to the playlist description!`;
};
