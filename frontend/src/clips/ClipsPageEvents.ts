import { PageEventHandler } from 'src/pageEvents';

export const ClipsPageEvents = {
  clipHighlightIsCorrectedTo(this: PageEventHandler, clipSlug: string) {},
  userCancelledClipForm(this: PageEventHandler) {},
  userHighlightsClip(this: PageEventHandler, clipSlug: string) {},
  userSubmittedClipForm(this: PageEventHandler, clipSlug: string) {},
};

export type ClipsPageEventsT = typeof ClipsPageEvents;
