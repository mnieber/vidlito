import { history } from '/src/routes/history';
import { IDashboardNav, navHandler, RouteSpecT } from '/src/routes/navHandler';
import { generatePath } from '/src/routes/utils/generatePath';

export const authRoutes = {
  signIn: '/auth/sign-in/',
  home: '/',
  help: '/playlist/vidlito/help-/-',
  signInByMagicLink: '/auth/sign-in/:magicLinkToken/',
  signUp: '/auth/sign-up/',
  termsAndConditions: '/terms-and-conditions/',
  requestPasswordReset: '/auth/request-password-reset/',
  requestMagicLink: '/auth/request-magic-link/',
  resetPassword: '/auth/reset-password/:passwordResetToken/',
  activateAccount: '/auth/activate-account/:activationToken/',
};

export class AuthNav implements IDashboardNav {
  routes = authRoutes;

  signIn(params: {}, callerId?: string): RouteSpecT {
    return this.run('signIn', params, callerId);
  }

  home(params: {}, callerId?: string): RouteSpecT {
    return this.run('home', params, callerId);
  }

  help(params: {}, callerId?: string): RouteSpecT {
    return this.run('help', params, callerId);
  }

  signInByMagicLink(
    params: { magicLinkToken: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('signInByMagicLink', params, callerId);
  }

  signUp(params: {}, callerId?: string): RouteSpecT {
    return this.run('signUp', params, callerId);
  }

  termsAndConditions(params: {}, callerId?: string): RouteSpecT {
    return this.run('termsAndConditions', params, callerId);
  }

  requestPasswordReset(params: {}, callerId?: string): RouteSpecT {
    return this.run('requestPasswordReset', params, callerId);
  }

  requestMagicLink(params: {}, callerId?: string): RouteSpecT {
    return this.run('requestMagicLink', params, callerId);
  }

  resetPassword(
    params: { passwordResetToken: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('resetPassword', params, callerId);
  }

  activateAccount(
    params: { activationToken: string },
    callerId?: string
  ): RouteSpecT {
    return this.run('activateAccount', params, callerId);
  }

  protected run(name: string, params: any, callerId?: string): RouteSpecT {
    return this.navHandler().run(name, params, callerId);
  }

  protected navHandler() {
    return navHandler();
  }
}

export class DefaultAuthNavHandler extends AuthNav {
  signIn(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.signIn, params),
      nav: history.push,
    };
  }

  home(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.home, params),
      nav: history.push,
    };
  }

  help(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.help, params),
      nav: history.push,
    };
  }

  signInByMagicLink(params: { magicLinkToken: string }, callerId?: string) {
    return {
      url: generatePath(authRoutes.signInByMagicLink, params),
      nav: history.push,
    };
  }

  signUp(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.signUp, params),
      nav: history.push,
    };
  }

  termsAndConditions(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.termsAndConditions, params),
      nav: history.push,
    };
  }

  requestPasswordReset(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.requestPasswordReset, params),
      nav: history.push,
    };
  }

  requestMagicLink(params: {}, callerId?: string) {
    return {
      url: generatePath(authRoutes.requestMagicLink, params),
      nav: history.push,
    };
  }

  resetPassword(params: { passwordResetToken: string }, callerId?: string) {
    return {
      url: generatePath(authRoutes.resetPassword, params),
      nav: history.push,
    };
  }

  activateAccount(params: { activationToken: string }, callerId?: string) {
    return {
      url: generatePath(authRoutes.activateAccount, params),
      nav: history.push,
    };
  }
}

export const authNav = new AuthNav();
