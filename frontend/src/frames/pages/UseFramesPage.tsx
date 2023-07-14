import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import {
  navToHome,
  navToNextPageAfterSignIn,
  navToSignIn,
  navToSignUp,
} from '/src/frames/FramesNavEvents';
import { useInstallNavLayer } from '/src/navHandler';
import { navHandler } from '/src/navHandler/NavHandler';

export const createFramesNavEventLayer = () => {
  return {
    navToHome: (() => {
      const ufn = navHandler.routeUfns.home(navHandler.history.push);
      ufn();
    }) as typeof navToHome,
    navToSignUp: (() => {
      const ufn = navHandler.routeUfns.signUp(navHandler.history.push);
      ufn();
    }) as typeof navToSignUp,
    navToSignIn: (() => {
      const ufn = navHandler.routeUfns.signIn(navHandler.history.push);
      ufn();
    }) as typeof navToSignIn,
    navToNextPageAfterSignIn: ((lastUrl?: string) => {
      if (lastUrl) {
        navHandler.history.push(lastUrl);
      } else {
        navToHome();
      }
    }) as typeof navToNextPageAfterSignIn,
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

    return <>{props.children}</>;
  }, DefaultProps)
);
