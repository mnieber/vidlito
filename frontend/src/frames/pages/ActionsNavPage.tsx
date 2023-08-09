import { useRouteMatch } from 'react-router-dom';
import { useInstallNavPage } from '/src/navHandler';

export const createActionsNavPage = () => {
  return {};
};

export type PropsT = React.PropsWithChildren<{}>;

export const ActionsNavPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallNavPage('ActionsNavPage', routeMatch.path, createActionsNavPage());
  return <>{props.children}</>;
};
