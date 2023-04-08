import { ActionsUIEventsT } from 'src/actions/ActionsUIEvents';
import { UIEventHandler, withUIEventHandlers } from 'src/uiEvents';

export type ActionsPageEventHandlerT = {
  closeActions: ActionsUIEventsT['closeActions'];
};

export const ActionsPageEventHandler: ActionsPageEventHandlerT = {
  closeActions(this: UIEventHandler) {
    const ufn = this.routeUfns.clip(this.history.push);
    ufn(this.getParams(true));
  },
};

export const UseActionsPage = withUIEventHandlers({
  layerName: 'ActionsPageEventHandler',
  eventHandlers: ActionsPageEventHandler,
});
