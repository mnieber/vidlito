import { observer } from 'mobx-react-lite';
import { useMessages } from './useMessages';
import { AuthCard, AuthCardL } from '/src/auth/components/AuthCard';
import { SignInForm } from '/src/auth/components/SignInForm';
import { useSignIn } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import {
  navToNextPageAfterSignIn,
  navToSignUp,
} from '/src/frames/FramesNavEvents';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

// Import styles
import './index.scss';

export const SignInCard = observer(() => {
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
      {
        // 🔳 Form 🔳
      }
      <SignInForm
        className={cn(AuthCardL.Form())}
        signIn={(email, password) => {
          return signIn({ userId: email, password }).then((response: ObjT) => {
            if (response.success) {
              navToNextPageAfterSignIn(response.lastUrl);
            }
          });
        }}
        errors={authState.errors}
      />

      {
        // 🔳 Forgot password message 🔳
      }
      <div
        className={cn(
          'SignInCard__ForgotPassword',
          [],
          [AuthCardL.FormCaption(), L.col.banner()]
        )}
      >
        {messages.divForgotYourPassword}
      </div>

      {
        // 🔳 Create account button 🔳
      }
      <button
        className={cn(
          'SignInCard__CreateAccountButton',
          [],
          [AuthCardL.CardFooter()]
        )}
        onClick={() => navToSignUp()}
      >
        {messages.createAccount}
      </button>
    </AuthCard>
  );
});
