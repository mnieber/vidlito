import { observer } from 'mobx-react-lite';
import { AuthCard, authCard } from 'src/auth/components/AuthCard';
import { SignInForm } from 'src/auth/components/SignInForm';
import { useSignIn } from 'src/auth/endpoints';
import { useAuthStateContext } from 'src/auth/hooks';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { bigButton, colBanner } from 'src/frames/components';
import { useUrlEventHandler } from 'src/frames/pages';
import { cn, d } from 'src/utils/classnames';
import { ObjT } from 'src/utils/types';
import { useMessages } from './useMessages';

export type UrlEventsT = FramesUrlEventsT;

export const SignInCard = observer(() => {
  const urlEvents = useUrlEventHandler<UrlEventsT>();

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
        className={cn(authCard.form.stackOnMessage)}
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
        className={cn(
          'SignInCard__ForgotPassword',
          colBanner,
          authCard.gapToSplitBody
        )}
      >
        {messages.divForgotYourPassword}
      </div>
      {
        // 🔳 CreateAccountButton 🔳
      }
      <button
        className={cn(
          d('SignInCard__CreateAccountButton'),
          bigButton,
          `bg-primaryTeal !text-white`
        )}
      >
        {messages.createAccount}
      </button>
    </AuthCard>
  );
});
