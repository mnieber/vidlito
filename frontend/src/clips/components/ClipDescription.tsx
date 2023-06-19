import { observer } from 'mobx-react-lite';
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
};

export const ClipDescription = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    if (!props.clip?.description) return <ClipDescriptionLoader {...props} />;

    return (
      <div
        className={cn(
          'ClipDescription',
          //
          //
          'py-[18px] px-4',
          props.className
        )}
      >
        <MarkdownView text={props.clip.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);

const ClipDescriptionLoader = observer(
  (props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn(
          'ClipDescriptionLoader',
          'h-[200px] my-4',
          'rounded bg-gray-300',
          props.className
        )}
      ></div>
    );
  }
);
