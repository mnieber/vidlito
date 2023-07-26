import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { AccountMenu } from '/src/frames/components/AccountMenu';
import { L } from '/src/frames/layout';
import { RouterLink } from '/src/routes/components/RouterLink';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { cn } from '/src/utils/classnames';

// Import styles
import './Footer.scss';

export type PropsT = {};

export const DefaultProps = {};

export const Footer = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routes = useRoutes();

    return (
      <div className={cn('Footer', 'p-4')}>
        <div className={cn(L.row.skewer())}>
          <div className={cn('Footer__Copyright')}>(c) 2024 Maarten Nieber</div>
          <div className={cn('mx-4')}>-</div>
          <RouterLink to={routes.termsAndConditions()}>
            Terms and Conditions
          </RouterLink>
          <div className={cn('grow')} />
          <AccountMenu />
        </div>
      </div>
    );
  }, DefaultProps)
);
