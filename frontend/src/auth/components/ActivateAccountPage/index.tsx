import { observer } from 'mobx-react-lite';
import { ActivateAccountCard } from '/src/auth/components/ActivateAccountCard';
import { AuthPage } from '/src/auth/components/AuthPage';
import { FramesNavEvents } from '/src/frames/FramesNavEvents';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type NavEventsT = typeof FramesNavEvents;

export const ActivateAccountPage = observer(() => {
  const l = L.auth.AuthPage;

  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(l.Gap())} />
      <ActivateAccountCard />
    </AuthPage>
  );
});
