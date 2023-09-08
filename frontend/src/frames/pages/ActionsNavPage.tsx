import { useInstallNavPage } from 'react-nav-handler';

export const createActionsNavPage = () => {
  return {};
};

export type PropsT = React.PropsWithChildren<{}>;

export const ActionsNavPage = (props: PropsT) => {
  useInstallNavPage('ActionsNavPage', createActionsNavPage());
  return <>{props.children}</>;
};
