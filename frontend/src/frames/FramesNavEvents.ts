import { NavHandler } from '/src/navHandler';

export const FramesNavEvents = {
  goToHome(this: NavHandler) {},
  goToSignUp(this: NavHandler) {},
  goToSignIn(this: NavHandler) {},
  userSignedIn(this: NavHandler) {},
  userProfileLoaded(this: NavHandler, username: string) {},
};
