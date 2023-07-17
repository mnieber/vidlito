import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistSettingsView.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {
  ...dps.playlist,
};

export const PlaylistSettingsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('PlaylistSettingsView', props.className)}>
        {`This playlist is ${props.playlist.isPublic ? 'public' : 'private'}.`}
      </div>
    );
  }, DefaultProps)
);
