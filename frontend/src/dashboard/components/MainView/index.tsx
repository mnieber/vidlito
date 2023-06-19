import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { AccountMenu } from '/src/frames/components';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

// Import styles
import './index.scss';
import '/src/dashboard/components/MainView/FormCancelButton.scss';
import '/src/dashboard/components/MainView/FormField.scss';
import '/src/dashboard/components/MainView/FormFieldLabel.scss';
import '/src/dashboard/components/MainView/FormSaveButton.scss';
import '/src/dashboard/components/MainView/MainForm.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.dashboardState,
};

export const MainView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const parentElmRef = React.useRef<HTMLDivElement>(null);
    const parentElm = parentElmRef.current;

    React.useEffect(() => {
      props.dashboardState.setVideoPlayerParentElm(parentElm);
    }, [props.dashboardState, parentElm]);

    return (
      <div className={cn(L.row.banner())}>
        <div
          ref={parentElmRef}
          tabIndex={0}
          className={cn(
            'MainView',
            //
            //
            'grow max-w-[1200px]',
            props.className
          )}
        >
          {props.children}
        </div>
        <AccountMenu className="mt-4 mx-8 self-start" />
      </div>
    );
  }, DefaultProps)
);
