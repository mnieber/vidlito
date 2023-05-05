import { observer } from 'mobx-react-lite';
import { AuthCard } from 'src/auth/components/AuthCard';
import { SignInForm } from 'src/auth/components/SignInForm';
import { useSignIn } from 'src/auth/endpoints';
import { useAuthStateContext } from 'src/auth/hooks';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { L } from 'src/frames/layout';
import { useUrlEventHandler } from 'src/frames/pages';
import { cln, cn } from 'src/utils/classnames';
import { ObjT } from 'src/utils/types';
import { useMessages } from './useMessages';

// Import styles
import './index.scss';

const useUrlEvents = () => useUrlEventHandler<typeof FramesUrlEvents>();

export const SignInCard = observer(() => {
  const urlEvents = useUrlEvents();
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const signIn = useSignIn(authState).mutateAsync;

  const l = L.auth.AuthCard;

  return (
    //
    // 🔳 SignInCard 🔳
    //
    <AuthCard id="SignInCard">
      {
        // 🔳 SignInForm 🔳
      }
      <SignInForm
        className={cn(l.Form())}
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
      <div
        className={cln(
          'SignInCard__ForgotPassword__',
          l.FormCaption()
        )(L.col.banner())}
      >
        {messages.divForgotYourPassword}
      </div>
      {
        // 🔳 CreateAccountButton 🔳
      }
      <button
        className={cln(
          //
          'SignInCard__CreateAccountButton',
          l.CardFooter()
        )()}
        onClick={() => urlEvents.goToSignUp()}
      >
        {messages.createAccount}
      </button>
    </AuthCard>
  );
});
