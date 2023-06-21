import { getNavFn } from '/src/navHandler/NavHandler';

export const ClipsNavEvents = {
  correctClipSlugUrlParam(clipSlug: string) {},
  userCancelledClipForm() {},
  userHighlightsClip(clipSlug: string) {},
  userSubmittedClipForm(clipSlug: string) {},
};

export const navCorrectClipSlugUrlParam = (clipSlug: string): void =>
  getNavFn('correctClipSlugUrlParam', navCorrectClipSlugUrlParam)(clipSlug);

export const navUserCancelledClipForm = (): void =>
  getNavFn('userCancelledClipForm', navUserCancelledClipForm)();

export const navUserHighlightsClip = (clipSlug: string): void =>
  getNavFn('userHighlightsClip', navUserHighlightsClip)(clipSlug);

export const navUserSubmittedClipForm = (clipSlug: string): void =>
  getNavFn('userSubmittedClipForm', navUserSubmittedClipForm)(clipSlug);
