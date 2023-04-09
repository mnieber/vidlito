import { observer } from 'mobx-react-lite';
import React from 'react';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import {
  FramesPageEventsT,
  PageEventHandler,
  usePageEventHandler,
} from 'src/frames/pages';
import { useInstallEventHandlers } from 'src/pageEvents';

export type FramesPageEventHandlerT = FramesPageEventsT;

export const FramesPageEventHandler: FramesPageEventHandlerT = {
  goToHome(this: PageEventHandler) {},
  userSignedIn(this: PageEventHandler) {},
  userProfileLoaded(this: PageEventHandler, username: string) {
    this.hiddenParams.username = username;
  },
};

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const UseFramesPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const pageEventHandler = usePageEventHandler<PageEventHandler>();
    useInstallEventHandlers('FramesPageEventHandler', FramesPageEventHandler);

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
      }),
      updateState: (inputs) => {
        FramesPageEventHandler.userProfileLoaded.bind(pageEventHandler)(
          inputs.userProfile?.username
        );
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
