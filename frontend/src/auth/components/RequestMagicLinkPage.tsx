import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPage_ } from 'src/auth/components/AuthPage';
import { RequestMagicLinkCard } from 'src/auth/components/RequestMagicLinkCard';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = FramesUrlEventsT;

export const RequestMagicLinkPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPage_.gap)} />
      <RequestMagicLinkCard />
    </AuthPage>
  );
});
