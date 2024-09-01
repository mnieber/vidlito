import { Route, Switch } from 'wouter';
import { ActivateAccountPage } from '/src/auth/components/ActivateAccountPage';
import { RequestMagicLinkPage } from '/src/auth/components/RequestMagicLinkPage';
import { RequestPasswordResetPage } from '/src/auth/components/RequestPasswordResetPage';
import { ResetPasswordPage } from '/src/auth/components/ResetPasswordPage';
import { SignInPage } from '/src/auth/components/SignInPage';
import { SignUpPage } from '/src/auth/components/SignUpPage';
import { authRoutes } from '/src/auth/routes';

export const AuthSwitch = () => {
  return (
    <Switch>
      <Route path={authRoutes.signIn}>
        <SignInPage />
      </Route>
      <Route path={authRoutes.signInByMagicLink}>
        <SignInPage />
      </Route>
      <Route path={authRoutes.signUp}>
        <SignUpPage />
      </Route>
      <Route path={authRoutes.activateAccount}>
        <ActivateAccountPage />
      </Route>
      <Route path={authRoutes.requestPasswordReset}>
        <RequestPasswordResetPage />
      </Route>
      <Route path={authRoutes.requestMagicLink}>
        <RequestMagicLinkPage />
      </Route>
      <Route path={authRoutes.resetPassword}>
        <ResetPasswordPage />
      </Route>
    </Switch>
  );
};
