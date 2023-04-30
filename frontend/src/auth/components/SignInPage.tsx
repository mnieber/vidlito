import { observer } from 'mobx-react-lite';
import { AuthPage } from 'src/auth/components/AuthPage';
import { SignInCard } from 'src/auth/components/SignInCard';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = typeof FramesUrlEvents;

export const SignInPage = observer(() => {
  const l = L.auth.AuthPage;

  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(l.Gap)} />
      <SignInCard />
    </AuthPage>
  );
});
