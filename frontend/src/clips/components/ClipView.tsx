import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
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
    if (isLoading(props.clip)) return <ClipViewLoader {...props} />;

    const description = props.clip?.description ?? '';

    return (
      <div
        className={cn(
          'ClipView',
          //
          //
          props.className
        )}
      >
        {!!description.length && (
          <MarkdownView text={description} className="mt-4" />
        )}
      </div>
    );
  }, DefaultProps)
);

const ClipViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn('ClipViewLoader', 'rounded bg-gray-100', props.className)}
    ></div>
  );
});
