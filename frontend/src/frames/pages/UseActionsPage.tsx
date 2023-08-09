import { useRouteMatch } from 'react-router-dom';
import { useInstallNavPage } from '/src/navHandler';

export const createActionsNavEventLayer = () => {
  return {};
};

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  const routeMatch = useRouteMatch();
  useInstallNavPage(
    'ActionsNavEventLayer',
    routeMatch.path,
    createActionsNavEventLayer()
  );
  return <>{props.children}</>;
};
