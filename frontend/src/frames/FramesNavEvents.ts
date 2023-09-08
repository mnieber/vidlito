import { navHandler } from 'react-nav-handler';

export const navToHome = (): void =>
  navHandler.getNavFn('navToHome', navToHome)();

export const navToHelp = (): void =>
  navHandler.getNavFn('navToHelp', navToHelp)();

export const navToSignUp = (): void =>
  navHandler.getNavFn('navToSignUp', navToSignUp)();

export const navToSignIn = (): void =>
  navHandler.getNavFn('navToSignIn', navToSignIn)();

export const navToNextPageAfterSignIn = (lastUrl?: string): void =>
  navHandler.getNavFn(
    'navToNextPageAfterSignIn',
    navToNextPageAfterSignIn
  )(lastUrl);
