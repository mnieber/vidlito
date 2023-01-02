import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { ClipList, ClipView } from 'src/clips/components';
import { PlaylistPicker } from 'src/playlists/components';
import { cn } from 'src/utils/classnames';
import './Dashboard.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Dashboard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'Dashboard',
          'grid grid-cols-[400px,1fr]',
          props.className
        )}
      >
        <div className={cn('Dashboard__LeftSidebar')}>
          <PlaylistPicker />
          <ClipList />
        </div>
        <div className={cn('Dashboard__RightMain')}>
          <ClipView />
        </div>
      </div>
    );
  }, DefaultProps)
);
