import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { authRoutes } from '/src/auth/routes';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import { RouterLink } from '/src/routes/components/RouterLink';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsCard.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {};

export const TermsCard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <div className={cn('TermsCard', props.className)}>
        <div className={cn('TermsCard__Copyright', 'mb-2')}>
          (C) 2024 Maarten Nieber
        </div>
        <RouterLink className="" to={authRoutes.termsAndConditions}>
          Terms and Conditions
        </RouterLink>
        <AccountMenu className="mt-4" isFullButton={true} />
      </div>
    );
  }, ContextProps)
);
