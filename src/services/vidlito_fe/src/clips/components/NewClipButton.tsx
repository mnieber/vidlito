import { observer } from 'mobx-react-lite';
import { useNavContext, type NavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { Addition } from 'skandha-facets';
import { ClipT, createClip } from '/src/api/types/ClipT';
import { PlaylistT } from '/src/api/types/PlaylistT';
import { UserProfileT } from '/src/api/types/UserProfileT';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { toClip } from '/src/clips/navFunctions';
import { DashboardState } from '/src/dashboard/DashboardState/DashboardState';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { ToolButton } from '/src/frames/components/ToolButton';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';
import { VideoController } from '/src/videos/VideoController';
import { videoPlayerCtx } from '/src/videos/hooks/useVideoPlayerContext';

// Import styles
import './NewClipButton.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  clipsAddition: clipsCtx.clipsAddition,
  dashboardState: dashboardCtx.dashboardState,
  isOwner: dashboardCtx.isOwner,
  playlist: playlistsCtx.playlist,
  userProfile: dashboardCtx.userProfile,
  videoController: videoPlayerCtx.videoController,
};

export const NewClipButton = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
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
