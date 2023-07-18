import { observer } from 'mobx-react-lite';
import { useMessages } from './useMessages';
import { AuthCard, AuthCardL } from '/src/auth/components/AuthCard';
import { RequestMagicLinkForm } from '/src/auth/components/RequestMagicLinkForm';
import { useRequestMagicLink } from '/src/auth/endpoints';
import { States } from '/src/auth/endpoints/states';
import { useAuthStateContext } from '/src/auth/hooks';

export const RequestMagicLinkCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const requestMagicLink = useRequestMagicLink(authState).mutateAsync;

  return (
    <AuthCard id="RequestMagicLinkCard">
      {
        // 🔳 Your password has been reset message 🔳
      }
      {authState.state === States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <div>{messages.divYourPasswordHasBeenReset}</div>
      )}

      {
        // 🔳 Form 🔳
      }
      {authState.state !== States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <RequestMagicLinkForm
          className={AuthCardL.Form()}
          requestMagicLink={(email: string) => {
            return requestMagicLink({ userId: email });
          }}
          errors={authState.errors}
        />
      )}

      {
        // 🔳 Have you found your password message 🔳
      }
      <div className={AuthCardL.CardFooter()}>
        {messages.haveYouFoundYourPassword}
      </div>
    </AuthCard>
  );
});
