import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { useNavContext } from 'react-nav-handler';
import { withContextProps } from 'react-props-from-context';
import { onClickNewClipButton } from '/src/clips/components/NewClipButton';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { CtaButtonS } from '/src/frames/components/CtaButton';
import { Icon } from '/src/frames/components/Icon';
import { MessageCard } from '/src/frames/components/MessageCard';
import { playlistsCtx } from '/src/playlists/hooks/usePlaylistsContext';
import { cn } from '/src/utils/classnames';

// Import styles
import './CreateFirstClip.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clipsAddition: clipsCtx.clipsAddition,
  clips: clipsCtx.clips,
  playlist: playlistsCtx.playlist,
  userProfile: dashboardCtx.userProfile,
  dashboardState: dashboardCtx.dashboardState,
};

export const CreateFirstClip = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    const navContext = useNavContext('CreateFirstClip');

    if (isLoading(props.clips)) {
      return <CreateFirstClipLoader />;
    }

    return (
      <MessageCard
        className={cn('CreateFirstClip', [props.className])}
        wallPaper={true}
      >
        <button
          className={cn(
            CtaButtonS.root(),
            CtaButtonS.color.darkBlueOnSkyBlue(),
            'CreateFirstClip__Button',
            ['w-[280px]', 'self-center']
          )}
          onClick={() => {
            onClickNewClipButton(navContext, props);
          }}
        >
          <Icon className={cn(CtaButtonS.Icon())} name="plus" />
          Create first clip
        </button>
      </MessageCard>
    );
  }, ContextProps)
);

export const CreateFirstClipLoader = (props: PropsT) => {
  return null;
};
