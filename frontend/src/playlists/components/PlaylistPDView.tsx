import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistPDView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlistPD,
};

export const PlaylistPDView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.playlistPD?.description)
      return <PlaylistPDViewLoader {...props} />;
    if (!props.playlistPD) return null;

    return (
      <div
        className={cn(
          'PlaylistPDView',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <MarkdownView text={props.playlistPD.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);

const PlaylistPDViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn(
        'PlaylistPDViewLoader',
        'h-[200px] my-4',
        'rounded bg-gray-300',
        props.className
      )}
    ></div>
  );
});
