import { observer } from 'mobx-react-lite';
import { withContextProps } from 'react-props-from-context';
import { NewClipButton } from '/src/clips/components';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { TrashButton } from '/src/frames/components';
import { NewPlaylistButton } from '/src/playlists/components';
import { SearchButton } from '/src/search/components/SearchButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './MainButtonsPanel.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  dashboardState: dashboardCtx.dashboardState,
  userProfile: dashboardCtx.userProfile,
};

export const MainButtonsPanel = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    return (
      <div
        className={cn('MainButtonsPanel', ['flex flex-wrap', props.className])}
      >
        <SearchButton className={cn('w-1/2', 'mb-6')} />
        {props.userProfile && <TrashButton className={cn('w-1/2', 'mb-6')} />}
        {props.userProfile && (
          <NewPlaylistButton className={cn('w-1/2', 'mb-6')} />
        )}
        {props.userProfile && <NewClipButton className={cn('w-1/2', 'mb-6')} />}
      </div>
    );
  }, ContextProps)
);
