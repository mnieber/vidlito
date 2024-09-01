import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { dashboardNav } from '/src/dashboard/routes';
import { ToolButton } from '/src/frames/components/ToolButton';
import { navTo } from '/src/routes/navHandler';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  username: dashboardCtx.username,
  userProfile: dashboardCtx.userProfile,
  dashboardState: dashboardCtx.dashboardState,
};

export const NewPlaylistButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <ToolButton
        className={cn('NewPlaylistButton', props.className)}
        iconName="plus"
        label="Playlist"
        onClick={() => onClickNewPlaylistButton(props)}
      />
    );
  }, ContextProps)
);

export function onClickNewPlaylistButton(props: {
  dashboardState: any;
  username: string;
  userProfile: any;
}) {
  props.dashboardState.navigationState.storeNavigationPoint();
  props.dashboardState.panelState.toggleIsPlaylistListExpanded(true);
  navTo(
    dashboardNav.playlist({
      ownerUsername: props.userProfile.username,
      playlistSlug: 'new-playlist',
    })
  );
}
