import { observer } from 'mobx-react-lite';
import { ActivateAccountCard } from '/src/auth/components/ActivateAccountCard';
import { AuthPage, AuthPageL } from '/src/auth/components/AuthPage';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { cn } from '/src/utils/classnames';

export const ActivateAccountPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPageL.Gap())} />
      <ActivateAccountCard />
    </AuthPage>
  );
});
