import { observer } from 'mobx-react-lite';
import { AuthPage, authPage } from 'src/auth/components/AuthPage';
import { SignInCard } from 'src/auth/components/SignInCard';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = FramesUrlEventsT;

export const SignInPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(authPage.gap)} />
      <SignInCard />
    </AuthPage>
  );
});
