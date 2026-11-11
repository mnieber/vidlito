import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useMessages } from './useMessages';
import { AuthCard } from '/src/auth/components/AuthCard';
import { ResetPasswordForm } from '/src/auth/components/ResetPasswordForm';
import { useResetPassword } from '/src/auth/endpoints';
import { States } from '/src/auth/endpoints/states';
import { useAuthStateContext } from '/src/auth/hooks';

export const ResetPasswordCard = observer(() => {
  const { messages } = useMessages();
  const params = useParams();
  const authState = useAuthStateContext(true);
  const resetPassword = useResetPassword(authState).mutateAsync;

  const isPasswordChanged = authState.state === States.RESET_PASSWORD_SUCCEEDED;

  return (
    <AuthCard id="ResetPasswordCard">
      {isPasswordChanged && <div>{messages.yourPasswordHasBeenChanged}</div>}
      {!isPasswordChanged && (
        <ResetPasswordForm
          errors={authState.errors}
          fieldErrors={authState.fieldErrors}
          resetPassword={(password) => {
            return resetPassword({
              password,
              // The key in the link of the email is url-encoded
              key: decodeURIComponent((params as any).key),
            });
          }}
        />
      )}
    </AuthCard>
  );
});
