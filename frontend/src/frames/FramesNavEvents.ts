import { getNavFn } from '/src/navHandler/NavHandler';

export const navGoToHome = (): void => getNavFn('goToHome', navGoToHome)();

export const navGoToSignUp = (): void =>
  getNavFn('goToSignUp', navGoToSignUp)();

export const navGoToSignIn = (): void =>
  getNavFn('goToSignIn', navGoToSignIn)();

export const navUserSignedIn = (): void =>
  getNavFn('userSignedIn', navUserSignedIn)();

export const navUserProfileLoaded = (userName: string): void =>
  getNavFn('userProfileLoaded', navUserProfileLoaded)(userName);
