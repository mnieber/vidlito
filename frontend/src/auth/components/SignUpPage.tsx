import { observer } from 'mobx-react-lite';
import { AuthPage } from '/src/auth/components/AuthPage';
import { SignUpCard } from '/src/auth/components/SignUpCard';
import { SignInLogo } from '/src/frames/components/SignInLogo';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export const SignUpPage = observer(() => {
  const l = L.auth.AuthPage;

  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(l.Gap())} />
      <SignUpCard />
    </AuthPage>
  );
});
