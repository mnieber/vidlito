import { observer } from 'mobx-react-lite';
import { AuthPage, authPage } from 'src/auth/components/AuthPage';
import { RequestPasswordResetCard } from 'src/auth/components/RequestPasswordResetCard';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = FramesUrlEventsT;

export const RequestPasswordResetPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(authPage.gap)} />
      <RequestPasswordResetCard />
    </AuthPage>
  );
});
