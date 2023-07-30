import { observer } from 'mobx-react-lite';
import React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { useSwipeable } from 'react-swipeable';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { TermsCard } from '/src/dashboard/components/TermsCard';
import { useOnResizeMainView } from '/src/dashboard/hooks/useOnResizeMainView';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './MainView.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const swipeHandlers = useSwipeable({
      onSwiped: (eventData) => {
        if (eventData.dir === 'Right') {
          props.dashboardState.panelState.setIsSidebarOpen(true);
        }
        if (eventData.dir === 'Left') {
          props.dashboardState.panelState.setIsSidebarOpen(false);
        }
      },
      ...{
        delta: 10, // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
        trackTouch: true, // track touch input
        trackMouse: true, // track mouse input
        rotationAngle: 0, // set a rotation angle
        swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
      },
    });

    const { onResizeMainView } = useOnResizeMainView({
      dashboardState: props.dashboardState,
    });

    return (
      <div
        tabIndex={0}
        className={cn(
          'MainView',
          [],
          [L.col.banner(), 'h-full', 'grow', props.className]
        )}
        {...swipeHandlers}
      >
        <div
          className={cn('MainView__BodyAndTermsCard', 'grow', L.row.banner())}
        >
          <div
            className={cn('MainView__Body', 'grow', L.row.flagPole())}
            style={{ maxWidth: props.dashboardState.panelState.maxVideoWidth }}
          >
            <ReactResizeDetector onResize={onResizeMainView} />
            {props.children}
          </div>
          <TermsCard />
        </div>
      </div>
    );
  }, DefaultProps)
);
