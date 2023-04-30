import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { MarkdownView } from 'src/frames/components';
import { cn } from 'src/utils/classnames';

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
    if (!props.clip.description) return null;

    return (
      <div
        className={cn(
          'ClipDescription',
          'pt-[18px] pb-[1px] px-4',
          '',
          'bg-gray-100 text-gray-700',
          'rounded-lg',
          props.className
        )}
      >
        <MarkdownView text={props.clip.description ?? ''} />
      </div>
    );
  }, DefaultProps)
);
