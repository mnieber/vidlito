import React from 'react';
import { useRoutes, useRouteUfns } from 'src/routes/hooks/useRoutes';
import { UrlState } from 'src/routes/UrlState';
import { useBuilder } from 'src/utils/hooks/useBuilder';

export type PropsT = {};

export const useUrlState = (props: PropsT) => {
  const { routeUfns, history } = useRouteUfns();
  const routes = useRoutes();
  const urlState = useBuilder(() => {
    return new UrlState({ history, routes, routeUfns });
  });

  React.useEffect(() => () => urlState.destroy(), [urlState]);

  return {
    urlState,
  };
};
