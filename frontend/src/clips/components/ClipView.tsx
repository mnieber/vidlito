import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { MarkdownView } from 'src/frames/components';
import { cn } from 'src/utils/classnames';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.dashboardState,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipView', props.className)}>
        <MarkdownView text={props.clip.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);
