import { observer } from 'mobx-react-lite';
import { AuthPage, AuthPageL } from '/src/auth/components/AuthPage';
import { SignUpCard } from '/src/auth/components/SignUpCard';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { cn } from '/src/utils/classnames';

export const SignUpPage = observer(() => {
  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(AuthPageL.Gap())} />
      <SignUpCard />
    </AuthPage>
  );
});
