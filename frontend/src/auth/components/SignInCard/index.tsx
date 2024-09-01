//
import { observer } from 'mobx-react-lite';
import { useParams } from 'wouter';
import { useMessages } from './useMessages';
import { AuthCard, AuthCardS } from '/src/auth/components/AuthCard';
import { SignInForm } from '/src/auth/components/SignInForm';
import { useSignIn } from '/src/auth/endpoints';
import { useAuthStateContext } from '/src/auth/hooks';
import { authNav } from '/src/auth/routes';
import {
  DialogButton,
  TealWithWhiteTextDialogButtonTrim,
} from '/src/frames/components/DialogButton';
import { L } from '/src/frames/layout';
import { history } from '/src/routes/history';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

export const SignInCard = observer(() => {
  const { messages } = useMessages();
  const authState = useAuthStateContext(true);
  const signIn = useSignIn(authState).mutateAsync;
  const params = useParams();

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
              const nextUrl = params.nextUrl;
              if (nextUrl) {
                history.push(nextUrl);
              } else {
                navTo(authNav.home({}));
              }
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
        onClick={() => navTo(authNav.signUp({}))}
        label={messages.createAccount}
      />
    </AuthCard>
  );
});
