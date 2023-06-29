import { observer } from 'mobx-react-lite';
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
    if (!props.playlist?.description)
      return <PlaylistDescriptionLoader {...props} />;

    return (
      <div
        className={cn(
          'PlaylistDescription',
          'bg-gray-100 text-gray-700',
          'rounded-lg',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <MarkdownView text={props.playlist.description} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistDescriptionLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'PlaylistDescriptionLoader',
          'h-[200px] my-4',
          'rounded bg-gray-300',
          props.className
        )}
      ></div>
    );
  }
);
