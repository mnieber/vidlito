import React from 'react';
import { cookiesState } from '/src/dashboard/DashboardState/CookiesState';
import { history } from '/src/navHandler/NavHandler';

export type PropsT = {};

export const ForwardToLastUrlEffect = (props: PropsT) => {
  React.useEffect(() => {
    const lastUrl = cookiesState.lastUrl ?? '/playlist/vidlito/help-/welcome-';
    if (!!lastUrl) {
      history.push(lastUrl);
    }
  }, []);
  return null;
};
