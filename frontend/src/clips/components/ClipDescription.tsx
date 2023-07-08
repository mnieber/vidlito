import { observer } from 'mobx-react-lite';
import { isLoading } from '/src/api/getState';
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
    if (isLoading(props.clip)) return <ClipDescriptionLoader {...props} />;

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
        <MarkdownView text={props.clip?.description ?? ''} />
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
          'h-[36px]',
          'rounded bg-gray-100',
          props.className
        )}
      ></div>
    );
  }
);
