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
import { useInstallEventLayer } from 'src/urlEvents';
import { UrlEventLayer } from 'src/urlEvents/UrlEventHandler';

export type FramesUrlEventLayerT = FramesUrlEventsT;

export class FramesUrlEventLayer
  extends UrlEventLayer
  implements FramesUrlEventLayerT
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
      UrlEventHandler & FramesUrlEventLayerT
    >();
    useInstallEventLayer(
      'FramesUrlEventLayer',
      routeMatch.path,
      (name: string, route: string) => new FramesUrlEventLayer(name, route)
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
        framesUrlEventLayer: urlEventHandler.getEventLayer(
          'FramesUrlEventLayer'
        ),
      }),
      updateState: (inputs) => {
        if (inputs.framesUrlEventLayer) {
          urlEventHandler.userProfileLoaded(inputs.userProfile?.username);
        }
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
