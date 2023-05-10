import { observer } from 'mobx-react-lite';
import ReactMarkdown from 'react-markdown';
import { withDefaultProps } from '/src/app/defaultProps';
import { cn } from '/src/utils/classnames';

// Import styles
import './MarkdownView.scss';

export type PropsT = {
  text: string;
  className?: any;
};

const DefaultProps = {};

export const MarkdownView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('MarkdownView', props.className)}>
        <ReactMarkdown>{props.text ?? ''}</ReactMarkdown>
      </div>
    );
  }, DefaultProps)
);
