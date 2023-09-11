import React from 'react';
import { useInstallNavPage } from 'react-nav-handler';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import {
  navToHelp,
  navToHome,
  navToNextPageAfterSignIn,
  navToSignIn,
  navToSignUp,
} from '/src/frames/FramesNavEvents';
import { history } from '/src/routes/history';
import { getRouteUfns } from '/src/routes/routeTable';

export const createFramesNavPage = () => {
  return {
    navToHome: (() => {
      const ufn = getRouteUfns<AuthRoutesT>().home(history.push);
      ufn();
    }) as typeof navToHome,
    navToHelp: (() => {
      const ufn = getRouteUfns<AuthRoutesT>().help(history.push);
      ufn();
    }) as typeof navToHelp,
    navToSignUp: (() => {
      const ufn = getRouteUfns<AuthRoutesT>().signUp(history.push);
      ufn();
    }) as typeof navToSignUp,
    navToSignIn: (() => {
      const ufn = getRouteUfns<AuthRoutesT>().signIn(history.push);
      ufn();
    }) as typeof navToSignIn,
    navToNextPageAfterSignIn: ((lastUrl?: string) => {
      if (lastUrl) {
        history.push(lastUrl);
      } else {
        navToHome();
      }
    }) as typeof navToNextPageAfterSignIn,
  };
};

export type PropsT = React.PropsWithChildren<{}>;

export const FramesNavPage = (props: PropsT) => {
  useInstallNavPage('FramesNavPage', createFramesNavPage());
  return <>{props.children}</>;
};
