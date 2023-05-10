import { observer } from 'mobx-react-lite';
import { useMessages } from './useMessages';
import { AuthCard } from '/src/auth/components/AuthCard';
import { RequestPasswordResetForm } from '/src/auth/components/RequestPasswordResetForm';
import { useRequestPasswordReset } from '/src/auth/endpoints';
import { States } from '/src/auth/endpoints/states';
import { useAuthStateContext } from '/src/auth/hooks';
import { L } from '/src/frames/layout';

export const RequestPasswordResetCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const requestPasswordReset = useRequestPasswordReset(authState).mutateAsync;

  const l = L.auth.AuthCard;

  return (
    <AuthCard id="RequestPasswordResetCard">
      {authState.state === States.REQUEST_PASSWORD_RESET_SUCCEEDED && (
        <div>{messages.divYourPasswordHasBeenReset}</div>
      )}
      {authState.state !== States.REQUEST_PASSWORD_RESET_SUCCEEDED && (
        <RequestPasswordResetForm
          className={l.Form()}
          requestPasswordReset={(email: string) => {
            return requestPasswordReset({ email });
          }}
          errors={authState.errors}
        />
      )}
      <div className={l.CardFooter()}>{messages.haveYouFoundYourPassword}</div>
    </AuthCard>
  );
});
