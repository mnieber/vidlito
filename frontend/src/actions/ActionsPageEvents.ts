import { PageEventHandler } from 'src/pageEvents';

export const ActionsPageEvents = {
  closeActions(this: PageEventHandler) {},
  goToActions(this: PageEventHandler) {},
};

export type ActionsPageEventsT = typeof ActionsPageEvents;
