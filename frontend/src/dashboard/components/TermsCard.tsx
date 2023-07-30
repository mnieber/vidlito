import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import { RouterLink } from '/src/routes/components/RouterLink';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { cn } from '/src/utils/classnames';

// Import styles
import './TermsCard.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {};

export const TermsCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routes = useRoutes();

    return (
      <div className={cn('TermsCard', props.className)}>
        <div className={cn('TermsCard__Copyright', 'mb-2')}>
          (C) 2024 Maarten Nieber
        </div>
        <RouterLink className="" to={routes.termsAndConditions()}>
          Terms and Conditions
        </RouterLink>
        <AccountMenu className="mt-4" isFullButton={true} />
      </div>
    );
  }, DefaultProps)
);
