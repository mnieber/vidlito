import { NavHandler } from '/src/navHandler';

export const ClipsNavEvents = {
  clipHighlightIsCorrectedTo(this: NavHandler, clipSlug: string) {},
  userCancelledClipForm(this: NavHandler) {},
  userHighlightsClip(this: NavHandler, clipSlug: string) {},
  userSubmittedClipForm(this: NavHandler, clipSlug: string) {},
};
