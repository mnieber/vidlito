import { observer } from 'mobx-react-lite';
import { AuthPage } from '/src/auth/components/AuthPage';
import { ResetPasswordCard } from '/src/auth/components/ResetPasswordCard';
import { FramesNavEvents } from '/src/frames/FramesNavEvents';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type NavEventsT = typeof FramesNavEvents;

export const ResetPasswordPage = observer(() => {
  const l = L.auth.AuthPage;

  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(l.Gap())} />
      <ResetPasswordCard />
    </AuthPage>
  );
});
