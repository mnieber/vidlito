import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useMessages } from './useMessages';
import { AuthCard, AuthCardS } from '/src/auth/components/AuthCard';
import { VerifyEmailForm } from '/src/auth/components/VerifyEmailForm';
import { useVerifyEmail } from '/src/auth/endpoints';
import { States } from '/src/auth/endpoints/states';
import { useAuthStateContext } from '/src/auth/hooks';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

export const VerifyEmailCard = observer(() => {
  const { messages } = useMessages();
  const params = useParams() as ObjT;
  const authState = useAuthStateContext(true);
  const verifyEmail = useVerifyEmail(authState).mutateAsync;

  return (
    <AuthCard id="VerifyEmailCard">
      {authState.state === States.VERIFY_EMAIL_SUCCEEDED && (
        <div>{messages.yourEmailAddressWasVerified}</div>
      )}
      {authState.state !== States.VERIFY_EMAIL_SUCCEEDED && (
        <>
          <VerifyEmailForm
            verifyEmail={() =>
              // The key in the link of the email is url-encoded
              verifyEmail({ key: decodeURIComponent(params.key) })
            }
            errors={authState.errors}
            fieldErrors={authState.fieldErrors}
          />
          <div className={cn(AuthCardS.CardFooter())}>
            {messages.ifYouAlreadyHaveAnAccount}
          </div>
        </>
      )}
    </AuthCard>
  );
});
