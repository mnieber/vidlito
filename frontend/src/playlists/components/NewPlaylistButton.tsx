import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { ToolButton } from '/src/frames/components/ToolButton';
import { navToPlaylist } from '/src/playlists/PlaylistsNavEvents';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewPlaylistButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.username,
  ...dps.userProfile,
  ...dps.dashboardState,
};

export const NewPlaylistButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <ToolButton
        className={cn('NewPlaylistButton', props.className)}
        iconName="plus"
        label="Playlist"
        onClick={() => onClickNewPlaylistButton(props)}
      />
    );
  }, DefaultProps)
);

export function onClickNewPlaylistButton(props: {
  dashboardState: any;
  username: string;
  userProfile: any;
}) {
  props.dashboardState.navigationState.storeNavigationPoint();
  props.dashboardState.panelState.toggleIsPlaylistListExpanded(true);
  navToPlaylist(props.userProfile.username, 'new-playlist');
}
