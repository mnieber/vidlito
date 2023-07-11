import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.playlist)) return <PlaylistViewLoader {...props} />;
    else if (!props.playlist) return null;

    return (
      <div
        className={cn(
          'PlaylistView',
          //
          //
          props.className
        )}
      >
        <MarkdownView text={props.playlist.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn(
        'PlaylistViewLoader',
        'h-[36px]',
        'rounded bg-gray-100',
        props.className
      )}
    ></div>
  );
});
