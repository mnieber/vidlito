import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPage_ } from 'src/auth/components/AuthPage';
import { RequestPasswordResetCard } from 'src/auth/components/RequestPasswordResetCard';
import { FramesUrlEvents } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = typeof FramesUrlEvents;

export const RequestPasswordResetPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPage_.gap)} />
      <RequestPasswordResetCard />
    </AuthPage>
  );
});
