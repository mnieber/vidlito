import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { LoaderBar } from '/src/frames/components/LoaderBar';
import { L } from '/src/frames/layout';
import {
  PlaylistListHeader,
  PlaylistListView,
} from '/src/playlists/components';
import { isLoading } from '/src/resourceStates';
import { RouterLink } from '/src/routes/components';
import { useRoutes } from '/src/routes/hooks/useRoutes';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistListPicker.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.playlists,
  ...dps.clips,
  ...dps.dashboardState,
  ...dps.userProfile,
};

export const PlaylistListPicker = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const routes = useRoutes();

    if (isLoading(props.playlists) || isLoading(props.clips)) {
      return <PlaylistListPickerLoader {...props} />;
    }

    if (!props.playlists.length) {
      return (
        <div className={cn('PlaylistListPicker__Empty')}>
          You have no playlists yet.
          {!props.userProfile && (
            <>
              {' '}
              <RouterLink to={routes.signUp()}>Create an account</RouterLink> to
              add one.
            </>
          )}
        </div>
      );
    }

    return (
      <div
        className={cn('PlaylistListPicker', [L.col.banner(), props.className])}
      >
        <PlaylistListHeader />
        <PlaylistListView
          className={cn('overflow-y-auto')}
          isExpanded={props.dashboardState.panelState.isPlaylistListExpanded}
        />
      </div>
    );
  }, DefaultProps)
);

export const PlaylistListPickerLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return (
      <LoaderBar
        className={cn('PlaylistListPickerLoader', [
          'h-3 my-4',
          props.className,
        ])}
      />
    );
  }
);
