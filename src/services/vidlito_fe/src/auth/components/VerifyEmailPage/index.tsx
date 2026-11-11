import { observer } from 'mobx-react-lite';
import { VerifyEmailCard } from '/src/auth/components/VerifyEmailCard';
import { AuthPage, AuthPageS } from '/src/auth/components/AuthPage';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { cn } from '/src/utils/classnames';

export const VerifyEmailPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPageS.Gap())} />
      <VerifyEmailCard />
    </AuthPage>
  );
});
