import { observer } from 'mobx-react-lite';
import ReactMarkdown from 'react-markdown';
import { dps, withDefaultProps } from 'src/app/defaultProps';
import { ClipHeaderView } from 'src/clips/components/ClipHeaderView';
import { cn } from 'src/utils/classnames';
import './ClipView.scss';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.clip,
};

export const ClipView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('ClipView', props.className)}>
        <ClipHeaderView className={cn('mb-2')} />
        <div className={cn('ClipView__Description')}>
          <ReactMarkdown>{props.clip.description ?? ''}</ReactMarkdown>
        </div>
      </div>
    );
  }, DefaultProps)
);
