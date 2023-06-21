import { getNavFn } from '/src/navHandler/NavHandler';

export const navSetClipSlugUrlParam = (clipSlug: string): void =>
  getNavFn('setClipSlugUrlParam', navSetClipSlugUrlParam)(clipSlug);

export const navUserCancelledClipForm = (): void =>
  getNavFn('userCancelledClipForm', navUserCancelledClipForm)();

export const navUserHighlightsClip = (clipSlug: string): void =>
  getNavFn('userHighlightsClip', navUserHighlightsClip)(clipSlug);

export const navUserSubmittedClipForm = (clipSlug: string): void =>
  getNavFn('userSubmittedClipForm', navUserSubmittedClipForm)(clipSlug);
