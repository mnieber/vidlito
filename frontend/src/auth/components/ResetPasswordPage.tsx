import { observer } from 'mobx-react-lite';
import { ResetPasswordCard } from 'src/auth/components/ResetPasswordCard';
import { FramesUrlEventsT } from 'src/frames/FramesUrlEvents';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export type UrlEventsT = FramesUrlEventsT;

export const ResetPasswordPage = observer(() => {
  return (
    <div className={cn('flex flex-row justify-around my-auto')}>
      <SignInLogo />
      <ResetPasswordCard />
    </div>
  );
});
