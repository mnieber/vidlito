import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { MarkdownView } from 'src/frames/components';
import { cn } from 'src/utils/classnames';

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
    if (!props.playlist.description) return null;

    return (
      <div
        className={cn(
          'PlaylistDescription',
          'pt-[18px] pb-[1px] px-4',
          '',
          'bg-gray-100 text-gray-700',
          'rounded-lg',
          props.className
        )}
      >
        <MarkdownView text={props.playlist.description} />
      </div>
    );
  }, DefaultProps)
);
