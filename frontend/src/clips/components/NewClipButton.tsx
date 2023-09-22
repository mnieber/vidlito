import { observer } from 'mobx-react-lite';
import { useNavContext, type NavContext } from 'react-nav-handler';
import { Addition } from 'skandha-facets';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { toClip } from '/src/clips/navFunctions';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { ToolButton } from '/src/frames/components/ToolButton';
import { cn } from '/src/utils/classnames';
import { VideoController } from '/src/videos/VideoController';

// Import styles
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.clipsAddition,
  ...dps.dashboardState,
  ...dps.isOwner,
  ...dps.playlist,
  ...dps.userProfile,
  ...dps.videoController,
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
    clip?: ClipT;
    clipsAddition: Addition;
    dashboardState: DashboardState;
    playlist: PlaylistT;
    userProfile: UserProfileT;
    videoController?: VideoController;
  }
) {
  props.dashboardState.navigationState.storeNavigationPoint();
  props.dashboardState.panelState.toggleShowPlaylistView(false);
  const videoTimeInS =
    props.videoController?.getPlayer()?.getCurrentTime() ?? 0;
  props.clipsAddition.add({
    values: createClip(props.userProfile, {
      url: props.clip?.url,
      startTimeMs: videoTimeInS * 1000,
    }),
  });
  navContext.nav(toClip)(
    props.playlist.ownerUsername,
    props.playlist.slug,
    'new-clip'
  );
}
