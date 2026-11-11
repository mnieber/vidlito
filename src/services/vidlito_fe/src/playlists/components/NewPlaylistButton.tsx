import { observer } from 'mobx-react-lite';
import { useNavContext, type NavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { ToolButton } from '/src/frames/components/ToolButton';
import { toPlaylist } from '/src/playlists/navFunctions';
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
    const navContext = useNavContext('NewPlaylistButton');
    return (
      <ToolButton
        className={cn('NewPlaylistButton', props.className)}
        iconName="plus"
        label="Playlist"
        onClick={() => onClickNewPlaylistButton(navContext, props)}
      />
    );
  }, ContextProps)
);

export function onClickNewPlaylistButton(
  navContext: NavContext,
  props: {
    dashboardState: any;
    username: string;
    userProfile: any;
  }
) {
  props.dashboardState.navigationState.storeNavigationPoint();
  props.dashboardState.panelState.toggleIsPlaylistListExpanded(true);
  navContext.nav(toPlaylist)(props.userProfile.username, 'new-playlist');
}
