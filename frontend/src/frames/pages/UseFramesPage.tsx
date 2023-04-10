import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import {
  FramesUrlEventsT,
  UrlEventHandler,
  useUrlEventHandler,
} from 'src/frames/pages';
import { useInstallEventHandlers } from 'src/urlEvents';
import { UrlEventLayer } from 'src/urlEvents/UrlEventHandler';

export type FramesUrlEventHandlerT = FramesUrlEventsT;

export class FramesUrlEventHandler
  extends UrlEventLayer
  implements FramesUrlEventHandlerT
{
  goToHome(this: UrlEventHandler) {}

  userSignedIn(this: UrlEventHandler) {}

  userProfileLoaded(this: UrlEventHandler, username: string) {
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
    const urlEventHandler = useUrlEventHandler<
      UrlEventHandler & FramesUrlEventHandlerT
    >();
    useInstallEventHandlers(
      'FramesUrlEventHandler',
      routeMatch.path,
      FramesUrlEventHandler
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
      }),
      updateState: (inputs) => {
        urlEventHandler.userProfileLoaded(inputs.userProfile?.username);
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
