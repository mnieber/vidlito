import { observer } from 'mobx-react-lite';
import { AuthCard, AuthCard_ } from 'src/auth/components/AuthCard';
import { RequestMagicLinkForm } from 'src/auth/components/RequestMagicLinkForm';
import { useRequestMagicLink } from 'src/auth/endpoints';
import { States } from 'src/auth/endpoints/states';
import { useAuthStateContext } from 'src/auth/hooks';
import { cn } from 'src/utils/classnames';
import { useMessages } from './useMessages';

export const RequestMagicLinkCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const requestMagicLink = useRequestMagicLink(authState).mutateAsync;

  return (
    <AuthCard id="RequestMagicLinkCard">
      {authState.state === States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <div>{messages.divYourPasswordHasBeenReset}</div>
      )}
      {authState.state !== States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <RequestMagicLinkForm
          requestMagicLink={(email: string) => {
            return requestMagicLink({ userId: email });
          }}
          errors={authState.errors}
        />
      )}
      <div className={cn(AuthCard_.gapToSecundaryMsg)} />
      <div>{messages.haveYouFoundYourPassword}</div>
    </AuthCard>
  );
});
