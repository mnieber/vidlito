import { navigation } from '/src/routes/history';
import { routeTable } from '/src/routes/routeTable';
import { getBestRouteMatch } from '/src/routes/utils/getRouteMatches';

export const getRouteMatch = () => {
  return getBestRouteMatch(
    routeTable.routeFnByName,
    navigation.location.pathname
  );
};
