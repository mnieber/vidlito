import {
  PageEventHandlerContext,
  createPageEventHandler,
} from 'src/pageEvents';
import { useRouteUfns, useRoutes } from 'src/routes/hooks/useRoutes';

type PropsT = React.PropsWithChildren<{}>;

export const PageEventHandlerProvider = (props: PropsT) => {
  const routes = useRoutes();
  const { routeUfns, history } = useRouteUfns();
  const pageEventHandler = createPageEventHandler({
    routes,
    routeUfns,
    history,
  });
  return (
    <PageEventHandlerContext.Provider value={pageEventHandler}>
      {props.children}
    </PageEventHandlerContext.Provider>
  );
};
