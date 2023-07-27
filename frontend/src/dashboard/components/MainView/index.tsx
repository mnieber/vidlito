import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useOnResizeMainView } from '/src/dashboard/hooks/useOnResizeMainView';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { onResizeMainView } = useOnResizeMainView({
      dashboardState: props.dashboardState,
    });
    const maxVideoWidth = props.dashboardState.panelState.isFullVideoWidth
      ? 1200
      : 800;

    return (
      <div
        tabIndex={0}
        className={cn(
          'MainView',
          [],
          [L.col.banner(), 'h-full', 'grow', props.className]
        )}
        style={{ maxWidth: maxVideoWidth }}
      >
        <ReactResizeDetector onResize={onResizeMainView} />
        {props.children}
      </div>
    );
  }, DefaultProps)
);
