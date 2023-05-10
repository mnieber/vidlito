import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import {
  FramesUrlEvents,
  UrlEventHandler,
  useUrlEventHandler,
} from '/src/frames/pages';
import { useInstallEventLayer } from '/src/urlEvents';
import { UrlEventLayer } from '/src/urlEvents/UrlEventHandler';

export type FramesUrlEventLayerT = typeof FramesUrlEvents;

export class FramesUrlEventLayer
  extends UrlEventLayer
  implements FramesUrlEventLayerT
{
  goToHome(this: UrlEventHandler) {
    const ufn = this.routeUfns.home(this.history.push);
    ufn();
  }

  goToSignUp(this: UrlEventHandler) {
    const ufn = this.routeUfns.signUp(this.history.push);
    ufn();
  }

  goToSignIn(this: UrlEventHandler) {
    const ufn = this.routeUfns.signIn(this.history.push);
    ufn();
  }

  userSignedIn(this: UrlEventHandler & FramesUrlEventLayer) {
    this.goToHome();
  }

  userProfileLoaded(this: UrlEventHandler, username: string) {
    this.hiddenParams.username = username;
  }
}

const useUrlEvents = () =>
  useUrlEventHandler<UrlEventHandler & FramesUrlEventLayerT>();

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const UseFramesPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    const urlEvents = useUrlEvents();

    useInstallEventLayer(
      'FramesUrlEventLayer',
      routeMatch.path,
      (name: string, route: string) => new FramesUrlEventLayer(name, route)
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
        framesUrlEventLayer: urlEvents.getEventLayer('FramesUrlEventLayer'),
      }),
      updateState: (inputs) => {
        if (inputs.framesUrlEventLayer) {
          urlEvents.userProfileLoaded(inputs.userProfile?.username);
        }
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
