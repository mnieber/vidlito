import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './PlaylistSettingsFormView.scss';

export type PropsT = {};

export const DefaultProps = {};

export const PlaylistSettingsFormView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return <div className={cn('PlaylistSettingsFormView')}></div>;
  }, DefaultProps)
);
