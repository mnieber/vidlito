import { UIEventHandler } from 'src/uiEvents';

export const ActionsUIEvents = {
  goToActions(this: UIEventHandler) {},
  closeActions(this: UIEventHandler) {},
};

export type ActionsUIEventsT = typeof ActionsUIEvents;
