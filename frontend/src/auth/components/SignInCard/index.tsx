import { observer } from 'mobx-react-lite';
import { AuthCard, AuthCard_ } from 'src/auth/components/AuthCard';
import { SignInForm } from 'src/auth/components/SignInForm';
import { useSignIn } from 'src/auth/endpoints';
import { useAuthStateContext } from 'src/auth/hooks';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { colBanner } from 'src/frames/components';
import { useUrlEventHandler } from 'src/frames/pages';
import { cln, cn } from 'src/utils/classnames';
import { ObjT } from 'src/utils/types';
import { useMessages } from './useMessages';

const useUrlEvents = () => useUrlEventHandler<typeof FramesUrlEvents>();

export const SignInCard = observer(() => {
  const urlEvents = useUrlEvents();

  const { messages } = useMessages();

  const authState = useAuthStateContext(true);
  const signIn = useSignIn(authState).mutateAsync;

  return (
    //
    // 🔳 SignInCard 🔳
    //
    <AuthCard id="SignInCard">
      {
        // 🔳 SignInForm 🔳
      }
      <SignInForm
        className={cn(AuthCard_.form.stackOnMessage)}
        signIn={(email, password) => {
          return signIn({ userId: email, password }).then((response: ObjT) => {
            urlEvents.userSignedIn();
          });
        }}
        errors={authState.errors}
      />
      {
        // 🔳 ForgotPassword 🔳
      }
      <div className={cln('SignInCard__ForgotPassword__')(colBanner)}>
        {messages.divForgotYourPassword}
      </div>
      <div className={cn(AuthCard_.gapToSecundaryMsg)} />
      {
        // 🔳 CreateAccountButton 🔳
      }
      <button
        className={cln('CreateAccountButton')()}
        onClick={() => urlEvents.goToSignUp()}
      >
        {messages.createAccount}
      </button>
    </AuthCard>
  );
});
