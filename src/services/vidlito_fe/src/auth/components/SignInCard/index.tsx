import { observer } from 'mobx-react-lite';
import { useMessages } from './useMessages';
import { AuthCard, AuthCardS } from '/src/auth/components/AuthCard';
import { SignInForm } from '/src/auth/components/SignInForm';
import { useSignIn } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import {
  DialogButton,
  TealWithWhiteTextDialogButtonTrim,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import {
  navToNextPageAfterSignIn,
  navToSignUp,
} from '/src/frames/navFunctions';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

// The page to go to after signing in (see navToSignIn). Only a path on this site is
// accepted, so that the link cannot send the user to another site.
const getNextUrl = () => {
  const nextUrl = new URLSearchParams(window.location.search).get('nextUrl');
  return nextUrl?.startsWith('/') && !nextUrl.startsWith('//')
    ? nextUrl
    : undefined;
};

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
      <SignInForm
        className={cn(AuthCardS.Form())}
        signIn={(email, password) => {
          return signIn({ userId: email, password }).then((response: ObjT) => {
            if (response.success) {
              navToNextPageAfterSignIn(getNextUrl() ?? '/');
            }
          });
        }}
        errors={authState.errors}
      />

      {
        // 🔳 Forgot password message 🔳
      }
      <div
        className={cn(AuthCardS.FormCaption(), 'SignInCard__ForgotPassword', [
          L.col.banner(),
        ])}
      >
        {messages.divForgotYourPassword}
      </div>

      {
        // 🔳 Create account button 🔳
      }
      <DialogButton
        trim={TealWithWhiteTextDialogButtonTrim}
        className={cn(AuthCardS.CardFooter())}
        onClick={() => navToSignUp()}
        label={messages.createAccount}
      />
    </AuthCard>
  );
});
