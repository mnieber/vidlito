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

// With nextUrl, the user goes to that page after signing in.
export const navToSignIn = (nextUrl?: string): void => {
  const suffix = nextUrl ? '?nextUrl=' + encodeURIComponent(nextUrl) : '';
  history.push(getRouteFns<AuthRoutesT>().signIn() + suffix);
};

export const navToNextPageAfterSignIn = (lastUrl?: string): void => {
  if (lastUrl) {
    history.push(lastUrl);
  } else {
    navToHome();
  }
};
