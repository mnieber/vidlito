import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const haveYouFoundYourPassword = (
    <div>
      If you've found your password then you can{' '}
      <RouterLink
        key="_signIn"
        dataCy="linkToSignIn"
        to={authRoutes.signIn}
        className="ml-1"
      >
        sign in
      </RouterLink>
      .
    </div>
  );

  return {
    messages: {
      haveYouFoundYourPassword,
      divYourPasswordHasBeenReset:
        "You've requested a magic link. " +
        'Please check your email for further instructions.',
    },
  };
};
