import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
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
        <RouterLink to={routes.termsAndConditions()}>
          Terms and Conditions
        </RouterLink>
      </div>
    );
  }, DefaultProps)
);
