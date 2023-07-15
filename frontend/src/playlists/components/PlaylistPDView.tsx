import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistPDView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistPDView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlist)) return <PlaylistPDViewLoader {...props} />;
    if (!props.playlist) return null;

    return (
      <div
        className={cn(
          'PlaylistPDView',
          //
          //
          props.className
        )}
      >
        <MarkdownView text={props.playlist.playlistPD.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistPDViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn(
        'PlaylistPDViewLoader',
        'rounded bg-gray-100',
        props.className
      )}
    ></div>
  );
});
