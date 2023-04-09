import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import {
  FramesPageEventsT,
  PageEventHandler,
  usePageEventHandler,
} from 'src/frames/pages';
import { useInstallEventHandlers } from 'src/pageEvents';
import { PageEventLayer } from 'src/pageEvents/PageEventHandler';

export type FramesPageEventHandlerT = FramesPageEventsT;

export class FramesPageEventHandler
  extends PageEventLayer
  implements FramesPageEventHandlerT
{
  goToHome(this: PageEventHandler) {}

  userSignedIn(this: PageEventHandler) {}

  userProfileLoaded(this: PageEventHandler, username: string) {
    this.hiddenParams.username = username;
  }
}

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const UseFramesPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    const pageEventHandler = usePageEventHandler<
      PageEventHandler & FramesPageEventHandlerT
    >();
    useInstallEventHandlers(
      'FramesPageEventHandler',
      routeMatch.path,
      FramesPageEventHandler
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
      }),
      updateState: (inputs) => {
        pageEventHandler.userProfileLoaded(inputs.userProfile?.username);
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
