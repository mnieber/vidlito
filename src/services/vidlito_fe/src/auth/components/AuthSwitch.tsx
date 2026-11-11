import { Route, Switch } from 'react-router-dom';
import { RequestPasswordResetPage } from '/src/auth/components/RequestPasswordResetPage';
import { ResetPasswordPage } from '/src/auth/components/ResetPasswordPage';
import { SignInPage } from '/src/auth/components/SignInPage';
import { SignUpPage } from '/src/auth/components/SignUpPage';
import { VerifyEmailPage } from '/src/auth/components/VerifyEmailPage';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { getRouteFns } from '/src/routes/routeTable';

export const AuthSwitch = () => {
  const routes = getRouteFns<AuthRoutesT>();

  return (
    <Switch>
      <Route exact path={routes.signIn()}>
        <SignInPage />
      </Route>
      <Route exact path={routes.signUp()}>
        <SignUpPage />
      </Route>
      <Route exact path={routes.verifyEmail()}>
        <VerifyEmailPage />
      </Route>
      <Route exact path={routes.requestPasswordReset()}>
        <RequestPasswordResetPage />
      </Route>
      <Route exact path={routes.resetPassword()}>
        <ResetPasswordPage />
      </Route>
    </Switch>
  );
};
