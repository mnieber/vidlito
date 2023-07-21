import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useNavHandlerParams } from '/src/frames/hooks/useNavHandlerParams';
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
  ...dps.dashboardState,
};

export const ClipNotFound = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const clipSlug = useNavHandlerParams().clipSlug;
    const width = (props.dashboardState.panelWidth ?? 100) - 1;
    const height = widthToHeight(width);
    const msg =
      clipSlug === '-'
        ? 'There are no clips in this playlist yet'
        : "Oops, it seems this clip doesn't exist";
    log('Clip not found');

    return (
      <div
        className={cn('ClipNotFound', ['p-4', L.row.skewer()])}
        style={{ height: height }}
      >
        <div className={cn('ClipNotFound__Message', [], ['grow'])}>{msg}</div>
      </div>
    );
  }, DefaultProps)
);
