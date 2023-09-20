import { observer } from 'mobx-react-lite';
import { useNavContext, type NavContext } from 'react-nav-handler';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { toClip } from '/src/clips/navFunctions';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { ToolButton } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.playlist,
  ...dps.dashboardState,
  ...dps.userProfile,
  ...dps.isOwner,
};

export const NewClipButton = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const navContext = useNavContext('NewClipButton');

    const enabled =
      props.isOwner(props.playlist) && props.playlist?.slug !== 'new-playlist';

    return (
      <ToolButton
        className={cn('NewClipButton', props.className)}
        disabled={!enabled}
        iconName="plus"
        label="Clip"
        onClick={() => {
          return onClickNewClipButton(navContext, props);
        }}
      />
    );
  }, DefaultProps)
);

export function onClickNewClipButton(
  navContext: NavContext,
  props: {
    dashboardState: DashboardState;
    playlist: PlaylistT;
    userProfile: UserProfileT;
  }
) {
  props.dashboardState.navigationState.storeNavigationPoint();
  props.dashboardState.panelState.toggleShowPlaylistView(false);
  navContext.nav(toClip)(
    props.playlist.ownerUsername,
    props.playlist.slug,
    'new-clip'
  );
}
