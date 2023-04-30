import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { ActivateAccountForm } from 'src/auth/components/ActivateAccountForm';
import { AuthCard } from 'src/auth/components/AuthCard';
import { useActivateAccount } from 'src/auth/endpoints';
import { States } from 'src/auth/endpoints/states';
import { useAuthStateContext } from 'src/auth/hooks';
import { ObjT } from 'src/utils/types';
import { useMessages } from './useMessages';

export const ActivateAccountCard = observer(() => {
  const { messages } = useMessages();
  const params = useParams() as ObjT;
  const authState = useAuthStateContext(true);
  const activateAccount = useActivateAccount(authState).mutateAsync;

  const activateAccountForm = (
    <ActivateAccountForm
      activateAccount={(password: string) =>
        activateAccount({ password, activationToken: params.activationToken })
      }
      errors={authState.errors}
    />
  );

  // Note that if we show the activateAccountForm and the user submits the form,
  // then the authState will be updated which causes this component to also re-render.

  return (
    <AuthCard id="ActivateAccountCard">
      {authState.state === States.ACTIVATE_ACCOUNT_SUCCEEDED && (
        <div>{messages.yourAccountWasActivated}</div>
      )}
      {authState.state !== States.ACTIVATE_ACCOUNT_SUCCEEDED &&
        activateAccountForm}
    </AuthCard>
  );
});
