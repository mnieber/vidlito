import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPage_ } from 'src/auth/components/AuthPage';
import { SignInCard } from 'src/auth/components/SignInCard';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = typeof FramesUrlEvents;

export const SignInPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPage_.gap)} />
      <SignInCard />
    </AuthPage>
  );
});
