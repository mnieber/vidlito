import React from 'react';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { UrlState } from 'src/routes/UrlState';

export type PropsT = {};

export const useUrlState = (props: PropsT) => {
  const { routeUfns, history } = useRouteUfns();
  const [urlState] = React.useState(() => {
    return new UrlState({ history, routeUfns });
  });

  React.useEffect(() => () => urlState.destroy(), [urlState]);

  return {
    urlState,
  };
};
