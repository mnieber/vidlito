import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { dps, withDefaultProps } from '/src/app/defaultProps';
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
    const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);
    const maxVideoWidth = props.dashboardState.panelState.isFullVideoWidth
      ? 1200
      : 800;

    return (
      <div className={cn('MainView', L.row.banner(), 'h-full')}>
        <div
          tabIndex={0}
          className={cn(
            'MainView__Body',
            [],
            [L.col.banner(), 'grow', props.className]
          )}
          style={{ maxWidth: maxVideoWidth }}
        >
          <ReactResizeDetector
            onResize={(width?: number) => {
              if (width !== undefined) {
                props.dashboardState.panelState.setPanelWidth(width - 8, true);
              }
              if (timeoutRef.current !== undefined) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                props.dashboardState.panelState.setPanelWidth(undefined, false);
              }, 500);
            }}
          />
          {props.children}
        </div>
      </div>
    );
  }, DefaultProps)
);
