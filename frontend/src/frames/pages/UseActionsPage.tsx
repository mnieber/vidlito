import { useInstallEventHandlers } from 'src/pageEvents';

export type ActionsPageEventHandlerT = {};

export const ActionsPageEventHandler: ActionsPageEventHandlerT = {};

export type PropsT = React.PropsWithChildren<{}>;

export const UseActionsPage = (props: PropsT) => {
  useInstallEventHandlers('ActionsPageEventHandler', ActionsPageEventHandler);
  return <>{props.children}</>;
};
