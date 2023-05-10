import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { NewClipButton } from '/src/clips/components';
import { TrashButton } from '/src/frames/components';
import { NewPlaylistButton } from '/src/playlists/components';
import { SearchButton } from '/src/search/components/SearchButton';
import { cn } from '/src/utils/classnames';

// Import styles
import './MainButtonsPanel.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
};

export const MainButtonsPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'MainButtonsPanel',
          //
          //
          'flex flex-wrap',
          props.className
        )}
      >
        <SearchButton className={cn('w-1/2', 'mb-6')} />
        <TrashButton className={cn('w-1/2', 'mb-6')} />
        <NewPlaylistButton className={cn('w-1/2', 'mb-6')} />
        <NewClipButton className={cn('w-1/2', 'mb-6')} />
      </div>
    );
  }, DefaultProps)
);
