import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'src/app/defaultProps';
import { Icon } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './TogglePlaylistDescription.scss';

export type PropsT = {
  togglePlaylistDescription: () => void;
  className?: any;
};

const DefaultProps = {};

export const TogglePlaylistDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('TogglePlaylistDescription', props.className)}>
        <Icon name="play" />
      </div>
    );
  }, DefaultProps)
);
