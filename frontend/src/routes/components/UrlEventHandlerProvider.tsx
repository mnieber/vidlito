import { useRouteUfns, useRoutes } from 'src/routes/hooks/useRoutes';
import { UrlEventHandlerContext, createUrlEventHandler } from 'src/urlEvents';

type PropsT = React.PropsWithChildren<{}>;

export const UrlEventHandlerProvider = (props: PropsT) => {
  const routes = useRoutes();
  const { routeUfns, history } = useRouteUfns();
  const urlEventHandler = createUrlEventHandler({
    routes,
    routeUfns,
    history,
  });
  return (
    <UrlEventHandlerContext.Provider value={urlEventHandler}>
      {props.children}
    </UrlEventHandlerContext.Provider>
  );
};
