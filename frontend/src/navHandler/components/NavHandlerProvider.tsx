import { NavHandlerContext, createNavHandler } from '/src/navHandler';
import { useRouteUfns, useRoutes } from '/src/routes/hooks/useRoutes';

type PropsT = React.PropsWithChildren<{}>;

export const NavHandlerProvider = (props: PropsT) => {
  const routes = useRoutes();
  const { routeUfns, history } = useRouteUfns();
  const navHandler = createNavHandler({
    routes,
    routeUfns,
    history,
  });
  return (
    <NavHandlerContext.Provider value={navHandler}>
      {props.children}
    </NavHandlerContext.Provider>
  );
};
