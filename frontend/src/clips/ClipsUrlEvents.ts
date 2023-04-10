import { UrlEventHandler } from 'src/urlEvents';

export const ClipsUrlEvents = {
  clipHighlightIsCorrectedTo(this: UrlEventHandler, clipSlug: string) {},
  userCancelledClipForm(this: UrlEventHandler) {},
  userHighlightsClip(this: UrlEventHandler, clipSlug: string) {},
  userSubmittedClipForm(this: UrlEventHandler, clipSlug: string) {},
};

export type ClipsUrlEventsT = typeof ClipsUrlEvents;
