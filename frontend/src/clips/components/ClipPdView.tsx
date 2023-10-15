import { observer } from 'mobx-react-lite';
import { isLoading } from 'mobx-resource-states';
import { withContextProps } from 'react-props-from-context';
import { clipsCtx } from '/src/clips/hooks/useClipsContext';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipPdView.scss';

export type PropsT = {
  className?: any;
};

const ContextProps = {
  clipPd: clipsCtx.clipPd,
  clipPdEdit: clipsCtx.clipPdEdit,
};

export const ClipPdView = observer(
  withContextProps((props: PropsT & typeof ContextProps) => {
    if (isLoading(props.clipPd)) return <ClipPdViewLoader {...props} />;
    if (!props.clipPd) return null;

    const description = props.clipPd.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('ClipPdView', [props.className])}>
        <MarkdownView text={description} />
      </div>
    );
  }, ContextProps)
);

const ClipPdViewLoader = observer((props: PropsT & typeof ContextProps) => {
  return <div className={cn('ClipPdViewLoader', props.className)}></div>;
});
