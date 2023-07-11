import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
import { dps, withDefaultProps } from '/src/app/defaultProps';
import { MarkdownView } from '/src/frames/components';
import { cn } from '/src/utils/classnames';

// Import styles
import './ClipPDView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clipPD,
  ...dps.clipPDEdit,
};

export const ClipPDView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (isLoading(props.clipPD)) return <ClipPDViewLoader {...props} />;
    if (!props.clipPD) return null;

    return (
      <div
        className={cn(
          'ClipPDView',
          //
          //
          props.className
        )}
      >
        <MarkdownView text={props.clipPD.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);

const ClipPDViewLoader = observer((props: PropsT & typeof DefaultProps) => {
  return (
    <div
      className={cn(
        'ClipPDViewLoader',
        'h-[36px]',
        'rounded bg-gray-100',
        props.className
      )}
    ></div>
  );
});
