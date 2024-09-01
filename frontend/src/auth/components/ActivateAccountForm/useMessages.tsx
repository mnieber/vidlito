import { authRoutes } from '/src/auth/routes';
import { RouterLink } from '/src/routes/components';

export const useMessages = () => {
  const divTheActivationFailed = (
    <div>
      The activation failed, probably because your account is already active.{' '}
      Please try to <RouterLink to={authRoutes.signIn}>sign in</RouterLink> or{' '}
      <RouterLink to={authRoutes.requestPasswordReset}>
        reset your password
      </RouterLink>
      .
    </div>
  );

  return {
    messages: {
      divSorryThatPasswordIsTooShort: 'Sorry, that password is too short',
      divUsernameAlreadyTaken: 'Sorry, that username is already taken',
      divTheActivationFailed,
      divSorryTechnicalError:
        'Sorry, there seems to be a technical problem. ' +
        'Check your internet connection, or try again later.',
      pleaseProvideANewPassword: 'Please provide a new password',
      sorryThatPasswordIsTooShort: 'Sorry, that password is too short',
      divYouAreOneStepAway:
        'You are one step away from activating your account. To proceed, please choose a username and password.',
    },
  };
};
