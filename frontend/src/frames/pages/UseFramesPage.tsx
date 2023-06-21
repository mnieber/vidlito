import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  navGoToHome,
  navGoToSignIn,
  navGoToSignUp,
  navUserProfileLoaded,
  navUserSignedIn,
} from '/src/frames/FramesNavEvents';
import { useUpdateStateReaction } from '/src/frames/hooks/useUpdateStateReaction';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';

export const createFramesNavEventLayer = () => {
  return {
    goToHome: (() => {
      const ufn = navHandler.routeUfns.home(navHandler.history.push);
      ufn();
    }) as typeof navGoToHome,
    goToSignUp: (() => {
      const ufn = navHandler.routeUfns.signUp(navHandler.history.push);
      ufn();
    }) as typeof navGoToSignUp,
    goToSignIn: (() => {
      const ufn = navHandler.routeUfns.signIn(navHandler.history.push);
      ufn();
    }) as typeof navGoToSignIn,
    userSignedIn: (() => {
      navGoToHome();
    }) as typeof navUserSignedIn,
    userProfileLoaded: ((username: string) => {
      navHandler.hiddenParams.username = username;
    }) as typeof navUserProfileLoaded,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {
  ...dps.userProfile,
};

export const UseFramesPage = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routeMatch = useRouteMatch();

    useInstallNavLayer(
      'FramesNavEventLayer',
      routeMatch.path,
      createFramesNavEventLayer()
    );

    useUpdateStateReaction({
      getInputs: () => ({
        userProfile: props.userProfile,
        framesNavEventLayer: navHandler.getNavLayer('FramesNavEventLayer'),
      }),
      updateState: (inputs) => {
        if (inputs.framesNavEventLayer) {
          navUserProfileLoaded(inputs.userProfile?.username);
        }
      },
    });

    return <>{props.children}</>;
  }, DefaultProps)
);
