import { UrlEventHandler } from 'src/urlEvents';

export const FramesUrlEvents = {
  goToHome(this: UrlEventHandler) {},
  userSignedIn(this: UrlEventHandler) {},
  userProfileLoaded(this: UrlEventHandler, username: string) {},
};

export type FramesUrlEventsT = typeof FramesUrlEvents;
