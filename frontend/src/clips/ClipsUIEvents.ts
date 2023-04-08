import { UIEventHandler } from 'src/uiEvents';

export const ClipsUIEvents = {
  clipHighlightIsCorrectedTo(this: UIEventHandler, clipSlug: string) {},
  userHighlightsClip(this: UIEventHandler, clipSlug: string) {},
};

export type ClipsUIEventsT = typeof ClipsUIEvents;
