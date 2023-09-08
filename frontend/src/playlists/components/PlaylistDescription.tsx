import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistDescription.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlist))
      return <PlaylistDescriptionLoader {...props} />;
    else if (!props.playlist) return null;

    const description = props.playlist.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('PlaylistDescription', [props.className])}>
        <MarkdownView text={description} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistDescriptionLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('PlaylistDescriptionLoader', props.className)}></div>
    );
  }
);
