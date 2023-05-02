import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipKeyHandler } from 'src/clips/components/ClipKeyHandler';
import { AccountMenu, Spinner, rowBanner } from 'src/frames/components';
import { isLoading } from 'src/resourceStates';
import { cn } from 'src/utils/classnames';

// Import styles
import './index.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.clip,
  ...dps.videoPlayerState,
  ...dps.dashboardState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const parentElm = parentElmRef.current;

    React.useEffect(() => {
      props.dashboardState.setVideoPlayerParentElm(parentElm);
    }, [props.dashboardState, parentElm]);

    if (isLoading(props.clip)) {
      return <Spinner />;
    } else if (!props.clip) return null;

    return (
      <ClipKeyHandler
        clip={props.clip}
        videoPlayerState={props.videoPlayerState}
      >
        <div className={cn(rowBanner)}>
          <div
            ref={parentElmRef}
            tabIndex={0}
            className={cn('MainView', 'grow max-w-[800px]', props.className)}
          >
            {props.children}
          </div>
          <AccountMenu className="mt-4 ml-8 self-start" />
        </div>
      </ClipKeyHandler>
    );
  }, DefaultProps)
);
