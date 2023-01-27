import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { NewClipButton } from 'src/clips/components';
import { colBanner } from 'src/frames/components';
import { NewPlaylistButton } from 'src/playlists/components';
import { SearchButton } from 'src/search/components/SearchButton';
import { cn } from 'src/utils/classnames';
import './MainButtonsPanel.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const MainButtonsPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('MainButtonsPanel', 'pb-2', colBanner, props.className)}
      >
        <SearchButton />
        <NewPlaylistButton />
        <NewClipButton />
      </div>
    );
  }, DefaultProps)
);
