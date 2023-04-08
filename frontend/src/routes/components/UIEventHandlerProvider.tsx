import { useRoutes } from 'src/routes/hooks';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { UIEventHandlerContext, createUIEventHandler } from 'src/uiEvents';

type PropsT = React.PropsWithChildren<{}>;

export const UIEventHandlerProvider = (props: PropsT) => {
  const routes = useRoutes();
  const { routeUfns, history } = useRouteUfns();
  const uiEventHandler = createUIEventHandler({ routes, routeUfns, history });
  return (
    <UIEventHandlerContext.Provider value={uiEventHandler}>
      {props.children}
    </UIEventHandlerContext.Provider>
  );
};
