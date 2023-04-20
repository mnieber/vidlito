import { observer } from 'mobx-react-lite';
import { SignUpCard } from 'src/auth/components/SignUpCard';
import { SignInLogo } from 'src/frames/components/SignInLogo';
import { cn } from 'src/utils/classnames';

export const SignUpPage = observer(() => {
  return (
    <div className={cn('flex flex-row justify-around my-auto')}>
      <SignInLogo />
      <SignUpCard />
    </div>
  );
});
