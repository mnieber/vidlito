import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { isLoading } from '/src/resourceStates';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistPdView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistPdView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlist)) return <PlaylistPdViewLoader {...props} />;
    if (!props.playlist) return null;

    const description = props.playlist.playlistPd?.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('PlaylistPdView', [props.className])}>
        <MarkdownView text={description} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistPdViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return <div className={cn('PlaylistPdViewLoader', props.className)}></div>;
});
