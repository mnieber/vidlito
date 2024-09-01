import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const divForgotYourPassword = (
    <div>
      Forgot your password? You can request a{' '}
      <RouterLink to={authRoutes.requestMagicLink}>magic link</RouterLink> or a{' '}
      <RouterLink to={authRoutes.requestPasswordReset}>
        password reset
      </RouterLink>
      .
    </div>
  );

  return {
    messages: {
      divAMagicLinkHasBeenSentToYourEmailAddress:
        'A magic link has been sent to your email address.',
      divForgotYourPassword,
      createAccount: 'Create An Account',
    },
  };
};
