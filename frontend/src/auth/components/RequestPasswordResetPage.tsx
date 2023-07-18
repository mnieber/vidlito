import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPageL } from '/src/auth/components/AuthPage';
import { RequestPasswordResetCard } from '/src/auth/components/RequestPasswordResetCard';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { cn } from '/src/utils/classnames';

export const RequestPasswordResetPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPageL.Gap())} />
      <RequestPasswordResetCard />
    </AuthPage>
  );
});
