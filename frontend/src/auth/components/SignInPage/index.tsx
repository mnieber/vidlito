import { observer } from 'mobx-react-lite';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthFrame } from 'src/auth/components/AuthFrame';
import { SignInForm } from 'src/auth/components/SignInForm';
import {
  useRequestMagicLink,
  useSignIn,
  useSignInByMagicLink,
} from 'src/auth/endpoints';
import { States } from 'src/auth/endpoints/states';
import { useAuthStateContext } from 'src/auth/hooks';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { useUrlEventHandler } from 'src/frames/pages';
import { ObjT } from 'src/utils/types';
import { useMessages } from './useMessages';

export type UrlEventsT = FramesUrlEventsT;

export const SignInPage = observer(() => {
  const urlEvents = useUrlEventHandler<UrlEventsT>();

  const { messages } = useMessages();

  const params = useParams() as ObjT;
  const authState = useAuthStateContext(true);
  const requestMagicLink = useRequestMagicLink(authState).mutateAsync;
  const signInByMagicLink = useSignInByMagicLink(authState).mutateAsync;
  const signIn = useSignIn(authState).mutateAsync;

  React.useEffect(() => {
    if (params.magicLinkToken) {
      signInByMagicLink({ magicLinkToken: params.magicLinkToken }).then(
        (response: ObjT) => {
          urlEvents.userSignedIn();
        }
      );
    }
  }, [params.magicLinkToken, signInByMagicLink, urlEvents]);

  return (
    <AuthFrame header="Sign in" id="SignInPage">
      {authState.state === States.REQUEST_MAGIC_LINK_SUCCEEDED && (
        <div>{messages.divAMagicLinkHasBeenSentToYourEmailAddress}</div>
      )}
      <SignInForm
        signIn={(email, password) => {
          return signIn({ userId: email, password }).then((response: ObjT) => {
            urlEvents.userSignedIn();
          });
        }}
        requestMagicLink={(email) => {
          return requestMagicLink({ userId: email });
        }}
        errors={authState.errors}
        className="mb-4"
      />
      <div className="SignInPage__Footer flex flex-col items-center">
        {messages.divForgotYourPassword}
        <div className="flex flex-row">
          {messages.divDontHaveAnAccount}
          {messages.linkSignUp}
        </div>
      </div>
    </AuthFrame>
  );
});
