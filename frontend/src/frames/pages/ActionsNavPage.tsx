import { useInstallNavPage } from '/src/navHandler';

export const createActionsNavPage = () => {
  return {};
};

export type PropsT = React.PropsWithChildren<{}>;

export const ActionsNavPage = (props: PropsT) => {
  useInstallNavPage('ActionsNavPage', createActionsNavPage());
  return <>{props.children}</>;
};
