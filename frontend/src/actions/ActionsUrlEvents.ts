import { UrlEventHandler } from 'src/urlEvents';

export const ActionsUrlEvents = {
  closeActions(this: UrlEventHandler) {},
  goToActions(this: UrlEventHandler) {},
};

export type ActionsUrlEventsT = typeof ActionsUrlEvents;
