import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { NewClipButton } from 'src/clips/components';
import { TrashButton } from 'src/frames/components';
import { NewPlaylistButton } from 'src/playlists/components';
import { SearchButton } from 'src/search/components/SearchButton';
import { cn } from 'src/utils/classnames';
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
          'flex flex-wrap',
          'pb-2',
          props.className
        )}
      >
        <SearchButton className={cn('w-1/2')} />
        <TrashButton className={cn('w-1/2')} />
        <NewPlaylistButton className={cn('w-1/2')} />
        <NewClipButton className={cn('w-1/2')} />
      </div>
    );
  }, DefaultProps)
);
