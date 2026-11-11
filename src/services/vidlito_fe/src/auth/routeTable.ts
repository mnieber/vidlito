import { RouteTable } from '/src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();
  routeTable.addRoutes(routes);
  return routeTable;
};

// The paths of the auth pages are those of the blogs example. The emails of the
// backend link to them (see HEADLESS_FRONTEND_URLS).
export const routes = {
  signIn: () => '/sign-in',
  home: () => '/',
  help: () => '/playlist/vidlito/help-/-',
  signUp: () => '/sign-up',
  termsAndConditions: () => '/terms-and-conditions/',
  verifyEmail: () => '/account/verify-email/:key',
  requestPasswordReset: () => '/account/password/reset',
  resetPassword: () => '/account/password/reset/:key',
};

export type RoutesT = {
  signIn: () => string;
  home: () => string;
  help: () => string;
  signUp: () => string;
  termsAndConditions: () => string;
  verifyEmail: (params: { key: string }) => string;
  requestPasswordReset: () => string;
  resetPassword: (params: { key: string }) => string;
};
