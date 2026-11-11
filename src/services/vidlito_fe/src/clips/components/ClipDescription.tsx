import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { dashboardCtx } from '/src/dashboard/hooks/useDashboardContext';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipDescription.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clip: clipsCtx.clip,
  dashboardState: dashboardCtx.dashboardState,
};

export const ClipDescription = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
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
  }, ContextProps)
);

const ClipDescriptionLoader = observer(
  (props: PropsT & typeof ContextProps) => {
    return <div className={cn('ClipDescriptionLoader', props.className)}></div>;
  }
);
