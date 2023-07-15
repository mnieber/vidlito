import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistSettingsView.scss';

export type PropsT = {};

export const DefaultProps = {};

export const PlaylistSettingsView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return <div className={cn('PlaylistSettingsView')}></div>;
  }, DefaultProps)
);
