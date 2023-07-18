import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPageL } from '/src/auth/components/AuthPage';
import { ResetPasswordCard } from '/src/auth/components/ResetPasswordCard';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { cn } from '/src/utils/classnames';

export const ResetPasswordPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPageL.Gap())} />
      <ResetPasswordCard />
    </AuthPage>
  );
});
