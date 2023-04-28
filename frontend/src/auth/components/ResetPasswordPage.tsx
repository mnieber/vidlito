import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPage_ } from 'src/auth/components/AuthPage';
import { ResetPasswordCard } from 'src/auth/components/ResetPasswordCard';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = typeof FramesUrlEvents;

export const ResetPasswordPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPage_.gap)} />
      <ResetPasswordCard />
    </AuthPage>
  );
});
