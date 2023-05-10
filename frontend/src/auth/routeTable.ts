import { getHomeRoute } from '/src/routes/getHomeRoute';
import { RouteTable } from '/src/routes/utils/RouteTable';

export const getRouteTable = () => {
  const routeTable = new RouteTable();

  routeTable.addRoutes({
    signIn: () => '/auth/sign-in/',
    home: () => getHomeRoute(),
    signInByMagicLink: () => '/auth/sign-in/:magicLinkToken/',
    signUp: () => '/auth/sign-up/',
    termsAndConditions: () => '/auth/terms-and-conditions/',
    requestPasswordReset: () => '/auth/request-password-reset/',
    requestMagicLink: () => '/auth/request-magic-link/',
    resetPassword: () => '/auth/reset-password/:passwordResetToken/',
    activateAccount: () => '/auth/activate-account/:activationToken/',
  });

  return routeTable;
};
