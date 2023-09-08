import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipDescription.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
  ...dps.dashboardState,
};

export const ClipDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clip)) return <ClipDescriptionLoader {...props} />;

    const description = props.clip?.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('ClipDescription', [props.className])}>
        {!!description.length && (
          <MarkdownView text={description} className="mt-4" />
        )}
      </div>
    );
  }, DefaultProps)
);

const ClipDescriptionLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return <div className={cn('ClipDescriptionLoader', props.className)}></div>;
  }
);
