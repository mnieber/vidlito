import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const yourPasswordHasBeenChanged = (
    <div>
      Your password has been changed. You can now{' '}
      <RouterLink dataCy={'linkToSignIn'} to={authRoutes.signIn}>
        sign in
      </RouterLink>
      .
    </div>
  );

  return {
    messages: {
      yourPasswordHasBeenChanged,
    },
  };
};
