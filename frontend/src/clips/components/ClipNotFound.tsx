import { observer } from 'mobx-react-lite';
import ReactResizeDetector from 'react-resize-detector';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useResize } from '/src/frames/hooks/useResize';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { log } from '/src/utils/logging';
import { widthToHeight } from '/src/videos/utils/aspectRatio';

// Import styles
import './ClipNotFound.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.videoPlayerState,
  ...dps.clips,
};

export const ClipNotFound = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { panelWidth, onResize } = useResize({});
    const width = (panelWidth ?? props.videoPlayerState.panelWidth ?? 100) - 1;
    const height = widthToHeight(width);
    const msg = props.clips.length
      ? "Oops, it seems this clip doesn't exist"
      : 'There are no clips in this playlist yet';
    log('Clip not found');

    return (
      <div
        className={cn(
          'ClipNotFound',
          //
          //
          L.row.skewer()
        )}
        style={{ height: height }}
      >
        <ReactResizeDetector handleWidth onResize={onResize} />
        <div
          className={cn(
            'ClipNotFound__Message',
            //
            //
            'grow'
          )}
        >
          {msg}
        </div>
      </div>
    );
  }, DefaultProps)
);
