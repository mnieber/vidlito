import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
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

    return (
      <div
        className={cn(
          'PlaylistDescription',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <MarkdownView text={props.playlist.description ?? ''} />
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
          'h-[36px]',
          'rounded bg-gray-100',
          props.className
        )}
      ></div>
    );
  }
);
