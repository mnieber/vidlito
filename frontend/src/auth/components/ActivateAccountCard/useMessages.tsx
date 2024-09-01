import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const yourAccountWasActivated = (
    <div>
      Your account was activated. You can now{' '}
      <RouterLink dataCy={'linkToSignIn'} to={authRoutes.signIn}>
        sign in
      </RouterLink>
      .
    </div>
  );

  const ifYouAlreadyHaveAnAccount = (
    <div>
      If you already have an account then you can{' '}
      <RouterLink
        key="_signIn"
        dataCy={'navToSignInLink'}
        to={authRoutes.signIn}
      >
        sign in
      </RouterLink>
      .
    </div>
  );

  return {
    messages: {
      ifYouAlreadyHaveAnAccount,
      yourAccountWasActivated,
    },
  };
};
