import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { RouterLink } from '/src/routes/components';
import { getRouteFns } from '/src/routes/routeTable';

export const useMessages = () => {
  const routes = getRouteFns<AuthRoutesT>();

  const divTheVerificationFailed = (
    <div>
      The verification failed, because the link is invalid or has expired.
      Please try to <RouterLink to={routes.signIn()}>sign in</RouterLink>: if
      your email address is not verified yet, we send you a new link.
    </div>
  );

  return {
    messages: {
      divTheVerificationFailed,
      divSorryTechnicalError:
        'Sorry, there seems to be a technical problem. ' +
        'Check your internet connection, or try again later.',
      divConfirmYourEmailAddress:
        'Please confirm that this is your email address.',
    },
  };
};
