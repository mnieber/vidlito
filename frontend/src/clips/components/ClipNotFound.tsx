import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { useParams } from 'wouter';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { log } from '/src/utils/logging';
import { ObjT } from '/src/utils/types';
import { widthToHeight } from '/src/videos/utils/aspectRatio';

// Import styles
import './ClipNotFound.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
};

export const ClipNotFound = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const params = useParams() as ObjT;
    const clipSlug = params.clipSlug;
    const width = (props.dashboardState.panelState.panelWidth ?? 100) - 1;
    const height = widthToHeight(width);
    const msg =
      clipSlug === '-'
        ? 'There are no clips in this playlist yet'
        : "Oops, it seems this clip doesn't exist";
    clipSlug !== '-' && log('Clip not found');

    return (
      <div
        className={cn('ClipNotFound', ['p-4', L.row.skewer()])}
        style={{ height: height }}
      >
        <div className={cn('ClipNotFound__Message', ['grow'])}>{msg}</div>
      </div>
    );
  }, ContextProps)
);
