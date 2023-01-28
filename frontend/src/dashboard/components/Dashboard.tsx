import { observer } from 'mobx-react-lite';
import { ClipT } from 'src/api/types/ClipT';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipList } from 'src/clips/components';
import { MainButtonsPanel } from 'src/dashboard/components/MainButtonsPanel';
import { card } from 'src/frames/components';
import { useRouteUfns } from 'src/routes/hooks/useRoutes';
import { cn } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

const DefaultProps = {
  ...dps.playlist,
};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { routeUfns, history } = useRouteUfns();

    return (
      <div
        className={cn(
          'Dashboard',
          'grid grid-cols-[400px,1fr]',
          props.className
        )}
      >
        <div className={cn('Dashboard__LeftSidebar')}>
          <MainButtonsPanel className={cn('mb-2')}/>
          <ClipList
            updateUrl={(clip: ClipT) =>
              routeUfns.clip(history.replace)(props.playlist, clip)
            }
          />
        </div>
        <div className={cn('Dashboard__RightMain', card)}>{props.children}</div>
      </div>
    );
  }, DefaultProps)
);
