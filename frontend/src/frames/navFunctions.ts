import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { history } from '/src/routes/history';
import { getRouteFns } from '/src/routes/routeTable';

export const navToHome = (): void => {
  history.push(getRouteFns<AuthRoutesT>().home());
};

export const navToHelp = (): void => {
  history.push(getRouteFns<AuthRoutesT>().help());
};

export const navToSignUp = (): void => {
  history.push(getRouteFns<AuthRoutesT>().signUp());
};

export const navToSignIn = (): void => {
  history.push(getRouteFns<AuthRoutesT>().signIn());
};

export const navToNextPageAfterSignIn = (lastUrl?: string): void => {
  if (lastUrl) {
    history.push(lastUrl);
  } else {
    navToHome();
  }
};
