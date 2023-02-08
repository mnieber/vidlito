import React from 'react';
import { LocationState } from 'src/routes/LocationState';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';

export type PropsT = {};

export const useLocationState = (props: PropsT) => {
  const { routeUfns, history } = useRouteUfns();
  const [locationState] = React.useState(() => {
    return new LocationState({ history, routeUfns });
  });

  React.useEffect(() => () => locationState.destroy(), [locationState]);

  return {
    locationState,
  };
};
