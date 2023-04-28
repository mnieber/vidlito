import { observer } from 'mobx-react-lite';
import { AuthCard, AuthCard_ } from 'src/auth/components/AuthCard';
import { RequestPasswordResetForm } from 'src/auth/components/RequestPasswordResetForm';
import { useRequestPasswordReset } from 'src/auth/endpoints';
import { States } from 'src/auth/endpoints/states';
import { useAuthStateContext } from 'src/auth/hooks';
import { cn } from 'src/utils/classnames';
import { useMessages } from './useMessages';

export const RequestPasswordResetCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const requestPasswordReset = useRequestPasswordReset(authState).mutateAsync;

  return (
    <AuthCard id="RequestPasswordResetCard">
      {authState.state === States.REQUEST_PASSWORD_RESET_SUCCEEDED && (
        <div>{messages.divYourPasswordHasBeenReset}</div>
      )}
      {authState.state !== States.REQUEST_PASSWORD_RESET_SUCCEEDED && (
        <RequestPasswordResetForm
          requestPasswordReset={(email: string) => {
            return requestPasswordReset({ email });
          }}
          errors={authState.errors}
        />
      )}
      <div className={cn(AuthCard_.gapToSecundaryMsg)} />
      <div>{messages.haveYouFoundYourPassword}</div>
    </AuthCard>
  );
});
