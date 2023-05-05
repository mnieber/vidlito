import { observer } from 'mobx-react-lite';
import { AuthPage } from 'src/auth/components/AuthPage';
import { RequestMagicLinkCard } from 'src/auth/components/RequestMagicLinkCard';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { L } from 'src/frames/layout';
import { cn } from 'src/utils/classnames';

export const RequestMagicLinkPage = observer(() => {
  const l = L.auth.AuthPage;

  return (
    <AuthPage>
      <SignInLogo />
      <div className={cn(l.Gap())} />
      <RequestMagicLinkCard />
    </AuthPage>
  );
});
