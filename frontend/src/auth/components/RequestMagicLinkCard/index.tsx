import { observer } from 'mobx-react-lite';
import { AuthCard } from 'src/auth/components/AuthCard';
import { RequestMagicLinkForm } from 'src/auth/components/RequestMagicLinkForm';
import { useRequestMagicLink } from 'src/auth/endpoints';
import { States } from 'src/auth/endpoints/states';
import { useAuthStateContext } from 'src/auth/hooks';
import { L } from 'src/frames/layout';
import { useMessages } from './useMessages';

export const RequestMagicLinkCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const requestMagicLink = useRequestMagicLink(authState).mutateAsync;

  const l = L.auth.AuthCard;

  return (
    <AuthCard id="RequestMagicLinkCard">
      {authState.state === States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <div>{messages.divYourPasswordHasBeenReset}</div>
      )}
      {authState.state !== States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <RequestMagicLinkForm
          className={l.Form()}
          requestMagicLink={(email: string) => {
            return requestMagicLink({ userId: email });
          }}
          errors={authState.errors}
        />
      )}
      <div className={l.CardFooter()}>{messages.haveYouFoundYourPassword}</div>
    </AuthCard>
  );
});
