import { observer } from 'mobx-react-lite';
import { useMessages } from './useMessages';
import { AuthCard } from '/src/auth/components/AuthCard';
import { SignInForm } from '/src/auth/components/SignInForm';
import { useSignIn } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import { FramesNavEvents } from '/src/frames/FramesNavEvents';
import { L } from '/src/frames/layout';
import { useNavHandler } from '/src/frames/pages';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

// Import styles
import './index.scss';

const useNavEvents = () => useNavHandler<typeof FramesNavEvents>();

export const SignInCard = observer(() => {
  const nav = useNavEvents();
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
            nav.userSignedIn();
          });
        }}
        errors={authState.errors}
      />
      {
        // 🔳 ForgotPassword 🔳
      }
      <div
        className={cn(
          'SignInCard__ForgotPassword__',
          //
          //
          l.FormCaption(),
          L.col.banner()
        )}
      >
        {messages.divForgotYourPassword}
      </div>
      {
        // 🔳 CreateAccountButton 🔳
      }
      <button
        className={cn(
          'SignInCard__CreateAccountButton',
          //
          //
          l.CardFooter()
        )}
        onClick={() => nav.goToSignUp()}
      >
        {messages.createAccount}
      </button>
    </AuthCard>
  );
});
