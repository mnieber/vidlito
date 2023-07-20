import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipPdView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipPd,
  ...dps.clipPdEdit,
};

export const ClipPdView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clipPd)) return <ClipPdViewLoader {...props} />;
    if (!props.clipPd) return null;

    const description = props.clipPd.description ?? '';
    if (!description.length) return null;

    return (
      <div className={cn('ClipPdView', [], [props.className])}>
        <MarkdownView text={description} />
      </div>
    );
  }, DefaultProps)
);

const ClipPdViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return <div className={cn('ClipPdViewLoader', props.className)}></div>;
});
