import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { RouterLink } from '/src/routes/components';
import { getRouteFns } from '/src/routes/routeTable';

export const useMessages = () => {
  const routes = getRouteFns<AuthRoutesT>();

  const divForgotYourPassword = (
    <div>
      Forgot your password? You can request a{' '}
      <RouterLink to={routes.requestPasswordReset()}>password reset</RouterLink>
      .
    </div>
  );

  return {
    messages: {
      divForgotYourPassword,
      createAccount: 'Create An Account',
    },
  };
};
