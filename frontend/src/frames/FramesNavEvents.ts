import { getNavFn } from '/src/navHandler/NavHandler';

export const navToHome = (): void => getNavFn('navToHome', navToHome)();

export const navToSignUp = (): void => getNavFn('navToSignUp', navToSignUp)();

export const navToSignIn = (): void => getNavFn('navToSignIn', navToSignIn)();

export const navToNextPageAfterSignIn = (lastUrl?: string): void =>
  getNavFn('navToNextPageAfterSignIn', navToNextPageAfterSignIn)(lastUrl);
