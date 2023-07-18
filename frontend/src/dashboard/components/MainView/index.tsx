import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { AccountMenu } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';
import '/src/dashboard/components/MainView/FormCancelButton.scss';
import '/src/dashboard/components/MainView/FormFieldLabel.scss';
import '/src/dashboard/components/MainView/FormSaveButton.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
  ...dps.videoPlayerState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const maxVideoWidth = props.videoPlayerState.isFullVideoWidth ? 1200 : 800;

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
          {props.children}
        </div>
        <AccountMenu className={cn('mt-4 mx-8')} />
      </div>
    );
  }, DefaultProps)
);
