import { observer } from 'mobx-react-lite';
import { ClipT } from 'src/api/types/ClipT';
import { defaultProps as dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipList } from 'src/clips/components';
import { ClipBar } from 'src/dashboard/components/ClipBar';
import { PlaylistPicker } from 'src/playlists/components';
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
          <PlaylistPicker updateUrl={routeUfns.playlist(history.replace)} />
          <ClipBar />
          <ClipList
            updateUrl={(clip: ClipT) =>
              routeUfns.clip(history.replace)(props.playlist, clip)
            }
          />
        </div>
        <div className={cn('Dashboard__RightMain')}>{props.children}</div>
      </div>
    );
  }, DefaultProps)
);
