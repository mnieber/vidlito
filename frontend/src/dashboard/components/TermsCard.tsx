import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
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

export const DefaultProps = {};

export const TermsCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
  }, DefaultProps)
);
