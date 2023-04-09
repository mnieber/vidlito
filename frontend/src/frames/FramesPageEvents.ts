import { PageEventHandler } from 'src/pageEvents';

export const FramesPageEvents = {
  goToHome(this: PageEventHandler) {},
  userSignedIn(this: PageEventHandler) {},
  userProfileLoaded(this: PageEventHandler, username: string) {},
};

export type FramesPageEventsT = typeof FramesPageEvents;
