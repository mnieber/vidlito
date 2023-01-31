import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './ToggleClipsAndPlaylists.scss';

export type PropsT = {
  showClips: boolean;
  setShowClips: Function;
  className?: any;
};

const DefaultProps = {};

export const ToggleClipsAndPlaylists = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ToggleClipsAndPlaylists', props.className)}></div>
    );
  }, DefaultProps)
);
