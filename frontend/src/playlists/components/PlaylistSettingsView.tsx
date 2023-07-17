import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistSettingsView.scss';

export type PropsT = {
  className?: any;
};

export const DefaultProps = {};

export const PlaylistSettingsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (true) return null;

    return <div className={cn('PlaylistSettingsView', props.className)}></div>;
  }, DefaultProps)
);
