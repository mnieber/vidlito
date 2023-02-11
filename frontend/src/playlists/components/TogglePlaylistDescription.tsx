import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './TogglePlaylistDescription.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.dashboardState,
};

export const TogglePlaylistDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('TogglePlaylistDescription', props.className)}>
        <Icon name="play" />
      </div>
    );
  }, DefaultProps)
);
