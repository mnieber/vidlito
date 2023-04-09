import { withPageEventHandlers } from 'src/pageEvents';

export type ActionsPageEventHandlerT = {};

export const ActionsPageEventHandler: ActionsPageEventHandlerT = {};

export const UseActionsPage = withPageEventHandlers({
  layerName: 'ActionsPageEventHandler',
  eventHandlers: ActionsPageEventHandler,
});
