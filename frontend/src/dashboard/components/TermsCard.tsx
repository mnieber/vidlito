import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import type { RoutesT as AuthRoutesT } from '/src/auth/routeTable';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import { RouterLink } from '/src/routes/components/RouterLink';
import { getRouteFns } from '/src/routes/routeTable';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsCard.scss';

export type PropsT = {
  className?: any;
};

export const ContextProps = {};

export const TermsCard = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const routeFns = getRouteFns<AuthRoutesT>();

    return (
      <div className={cn('TermsCard', props.className)}>
        <div className={cn('TermsCard__Copyright', 'mb-2')}>
          (C) 2024 Maarten Nieber
        </div>
        <RouterLink className="" to={routeFns.termsAndConditions()}>
          Terms and Conditions
        </RouterLink>
        <AccountMenu className="mt-4" isFullButton={true} />
      </div>
    );
  }, ContextProps)
);
