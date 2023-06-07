import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { FramesNavEvents, NavHandler, useNavHandler } from '/src/frames/pages';
import { useInstallNavLayer } from '/src/navHandler';
import { NavLayer } from '/src/navHandler/NavHandler';

export type FramesNavEventLayerT = typeof FramesNavEvents;

export class FramesNavEventLayer
  extends NavLayer
  implements FramesNavEventLayerT
{
  goToHome(this: NavHandler) {
    const ufn = this.routeUfns.home(this.history.push);
    ufn();
  }

  goToSignUp(this: NavHandler) {
    const ufn = this.routeUfns.signUp(this.history.push);
    ufn();
  }

  goToSignIn(this: NavHandler) {
    const ufn = this.routeUfns.signIn(this.history.push);
    ufn();
  }

  userSignedIn(this: NavHandler & FramesNavEventLayer) {
    this.goToHome();
  }

  userProfileLoaded(this: NavHandler, username: string) {
    this.hiddenParams.username = username;
  }
}

const useNavEvents = () => useNavHandler<NavHandler & FramesNavEventLayerT>();

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const UseFramesPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();
    const nav = useNavEvents();

    useInstallNavLayer(
      'FramesNavEventLayer',
      routeMatch.path,
      (name: string, route: string) => new FramesNavEventLayer(name, route)
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
        framesNavEventLayer: nav.getNavLayer('FramesNavEventLayer'),
      }),
      updateState: (inputs) => {
        if (inputs.framesNavEventLayer) {
          nav.userProfileLoaded(inputs.userProfile?.username);
        }
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
